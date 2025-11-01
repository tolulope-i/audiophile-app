import Link from 'next/link';

type Props = { params: { id: string } };

export default function Confirmation({ params }: Props) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank you for your order!</h1>
        <p className="text-lg text-gray-600 mb-2">Your order has been confirmed and will be shipped soon.</p>
        <p className="text-gray-700 mb-6">
          Order ID: <strong className="text-orange-500">{params.id}</strong>
        </p>
        
        <p className="text-gray-600 mb-8">
          A confirmation email has been sent to your email address with all the order details.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold transition-colors"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/orders" 
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded font-semibold transition-colors"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}