import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, items, subtotal, customerName, customerEmail, shippingAddress, note } = body;

    if (!orderId || !items || !customerName || !customerEmail || !shippingAddress) {
      return NextResponse.json(
        { error: "Missing required order fields" },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Check if user is logged in via JWT
    let userId: string | null = null;
    const cookieStore = await cookies();
    const token = cookieStore.get("bamboo-token")?.value;
    if (token) {
      const payload = verifyToken(token);
      if (payload) userId = payload.userId;
    }

    const order = {
      orderId,
      userId,
      customerEmail: customerEmail.toLowerCase(),
      items,
      subtotal,
      customerName,
      shippingAddress,
      note: note || "",
      status: "confirmed",
      createdAt: new Date(),
    };

    await db.collection("orders").insertOne(order);

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();

    // Try JWT auth first
    const cookieStore = await cookies();
    const token = cookieStore.get("bamboo-token")?.value;

    let filter: Record<string, string> = {};

    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        filter = { userId: payload.userId };
      }
    }

    // If no JWT, check for email query param (used by Firebase-authenticated users)
    if (!filter.userId) {
      const email = request.nextUrl.searchParams.get("email");
      if (!email) {
        return NextResponse.json({ orders: [] });
      }
      filter = { customerEmail: email.toLowerCase() };
    }

    const orders = await db
      .collection("orders")
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    const mapped = orders.map((o) => ({
      id: o._id.toString(),
      orderId: o.orderId,
      items: o.items,
      subtotal: o.subtotal,
      customerName: o.customerName,
      customerEmail: o.customerEmail,
      shippingAddress: o.shippingAddress,
      note: o.note,
      status: o.status,
      createdAt: typeof o.createdAt === "string" ? o.createdAt : o.createdAt.toISOString(),
    }));

    return NextResponse.json({ orders: mapped });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json({ orders: [] });
  }
}
