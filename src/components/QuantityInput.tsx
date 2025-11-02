'use client';
import React from 'react';

export default function QuantityInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center bg-[#f1f1f1] p-1">
      <button aria-label="decrease" onClick={() => onChange(Math.max(1, value - 1))} className="px-2">-</button>
      <div className="px-3">{value}</div>
      <button aria-label="increase" onClick={() => onChange(value + 1)} className="px-2">+</button>
    </div>
  );
}
