"use client";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onChange,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center rounded-md border border-bamboo-200">
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="px-3 py-2 text-bamboo-600 hover:bg-bamboo-50 disabled:opacity-50"
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="min-w-[3rem] border-x border-bamboo-200 px-3 py-2 text-center text-sm font-medium text-bamboo-800">
        {quantity}
      </span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        className="px-3 py-2 text-bamboo-600 hover:bg-bamboo-50 disabled:opacity-50"
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
