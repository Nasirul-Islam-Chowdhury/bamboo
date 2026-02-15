import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-6xl font-bold text-bamboo-300">404</h1>
      <h2 className="mt-4 font-serif text-2xl font-bold text-bamboo-800">
        Page Not Found
      </h2>
      <p className="mt-2 text-bamboo-600">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-forest-500 px-6 py-3 font-medium text-white transition-colors hover:bg-forest-600"
      >
        Back to Home
      </Link>
    </div>
  );
}
