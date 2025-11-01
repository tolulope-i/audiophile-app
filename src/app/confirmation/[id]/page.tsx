// app/confirmation/[id]/page.tsx
import React from 'react';

type Props = { params: { id: string } };

export default function Confirmation({ params }: Props) {
  // Ideally fetch order from Convex by ID; for now show simple confirmation.
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold">Thank you — order placed!</h1>
        <p className="mt-4">Your order id is <strong>{params.id}</strong></p>
        <p className="mt-2">A confirmation email has been sent to your email address.</p>
      </div>
    </div>
  );
}
