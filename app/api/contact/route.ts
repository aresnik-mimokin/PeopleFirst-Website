import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(1, 'Company is required'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const { name, company, email, role, message } = parsed.data

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error: sendError } = await resend.emails.send({
      from: 'PeopleFirst Website <onboarding@resend.dev>',
      to: ['carla@wearepeoplefirst.com'],
      reply_to: email,
      subject: `New Inquiry: ${role} at ${company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #7C3AED; margin-bottom: 24px;">New Hiring Inquiry via PeopleFirst Website</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B7280; width: 140px; vertical-align: top;"><strong>Name</strong></td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; vertical-align: top;"><strong>Company</strong></td>
              <td style="padding: 8px 0;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; vertical-align: top;"><strong>Email</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3B82F6;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; vertical-align: top;"><strong>Role Hiring For</strong></td>
              <td style="padding: 8px 0;">${role}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; vertical-align: top;"><strong>Message</strong></td>
              <td style="padding: 8px 0; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;" />
          <p style="color: #9CA3AF; font-size: 12px;">Sent from wearepeoplefirst.com contact form</p>
        </div>
      `,
    })

    if (sendError) {
      console.error('Resend error (main):', JSON.stringify(sendError))
      return NextResponse.json({ error: 'Failed to send message', detail: sendError }, { status: 500 })
    }

    // Auto-reply — fire and forget, never block the success response
    resend.emails.send({
      from: 'Carla at PeopleFirst <onboarding@resend.dev>',
      to: [email],
      subject: "Thanks for reaching out — I'll be in touch shortly",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #7C3AED; margin-bottom: 16px;">Hi ${name},</h2>
          <p style="color: #374151; line-height: 1.6;">
            Thanks for reaching out about your <strong>${role}</strong> role at <strong>${company}</strong>.
          </p>
          <p style="color: #374151; line-height: 1.6;">
            I've received your message and will get back to you within one business day to discuss how PeopleFirst can help you find the right talent.
          </p>
          <p style="color: #374151; line-height: 1.6;">
            In the meantime, feel free to connect with me on <a href="https://www.linkedin.com/in/carlacostantini" style="color: #7C3AED;">LinkedIn</a>.
          </p>
          <br />
          <p style="color: #374151;">Best,<br /><strong>Carla Costantini</strong><br />Founder, PeopleFirst Agency<br /><a href="mailto:carla@wearepeoplefirst.com" style="color: #7C3AED;">carla@wearepeoplefirst.com</a></p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
