import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { generateOrderConfirmationEmail } from '@/lib/email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { order, customerEmail } = await request.json()

    const { data, error } = await resend.emails.send({
      from: 'Audiophile <noreply@audiophile.com>',
      to: [customerEmail],
      subject: `Order Confirmation - #${order.orderId}`,
      html: generateOrderConfirmationEmail(order),
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}