'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Linkedin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { useTranslation } from '@/lib/i18n-context'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { DEFAULTS } from '@/lib/content-defaults'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(1, 'Company is required'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

function FormInput({ label, error, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        <span className="text-purple-400 ml-0.5" aria-hidden="true">*</span>
      </label>
      <input
        id={id}
        className={cn(
          'h-11 w-full rounded-xl border bg-background px-4 text-sm transition-colors',
          'placeholder:text-muted-foreground/50',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
          error ? 'border-red-500/70 focus:ring-red-500/50' : 'border-input',
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

function FormTextarea({ label, error, id, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        <span className="text-purple-400 ml-0.5" aria-hidden="true">*</span>
      </label>
      <textarea
        id={id}
        className={cn(
          'w-full rounded-xl border bg-background px-4 py-3 text-sm transition-colors resize-none',
          'placeholder:text-muted-foreground/50',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
          error ? 'border-red-500/70 focus:ring-red-500/50' : 'border-input',
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        rows={5}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export function Contact() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-padding bg-muted/30 dark:bg-navy-900/50"
    >
      <div className="container" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column — info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-3">
              Contact
            </p>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight mb-4"
            >
              {t('contact.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t('contact.subtitle')}
            </p>

            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              {t('contact.direct_contact')}
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${DEFAULTS.contact.email}`}
                className="flex items-center gap-3 group"
                aria-label={`Email ${DEFAULTS.contact.email}`}
              >
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 ring-1 ring-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-purple-400" aria-hidden="true" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-purple-400 transition-colors">
                  {DEFAULTS.contact.email}
                </span>
              </a>

              <a
                href={DEFAULTS.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
                aria-label="Connect on LinkedIn"
              >
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Linkedin className="h-4 w-4 text-blue-400" aria-hidden="true" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-blue-400 transition-colors">
                  {t('contact.linkedin')}
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-border/60 bg-card p-7 md:p-8 shadow-sm">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-8 gap-4"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2 className="h-14 w-14 text-green-500" aria-hidden="true" />
                  <h3 className="font-display font-bold text-xl">{t('contact.success_title')}</h3>
                  <p className="text-muted-foreground">{t('contact.success_message')}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-2"
                  >
                    Send another
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  aria-label="Contact form"
                >
                  {submitStatus === 'error' && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 mb-6"
                    >
                      <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-medium text-red-400">{t('contact.error_title')}</p>
                        <p className="text-xs text-red-400/80 mt-0.5">{t('contact.error_message')}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormInput
                        id="name"
                        label={t('contact.name_label')}
                        placeholder={t('contact.name_placeholder')}
                        autoComplete="name"
                        error={errors.name?.message}
                        {...register('name')}
                      />
                      <FormInput
                        id="company"
                        label={t('contact.company_label')}
                        placeholder={t('contact.company_placeholder')}
                        autoComplete="organization"
                        error={errors.company?.message}
                        {...register('company')}
                      />
                    </div>

                    <FormInput
                      id="email"
                      type="email"
                      label={t('contact.email_label')}
                      placeholder={t('contact.email_placeholder')}
                      autoComplete="email"
                      error={errors.email?.message}
                      {...register('email')}
                    />

                    <FormInput
                      id="role"
                      label={t('contact.role_label')}
                      placeholder={t('contact.role_placeholder')}
                      error={errors.role?.message}
                      {...register('role')}
                    />

                    <FormTextarea
                      id="message"
                      label={t('contact.message_label')}
                      placeholder={t('contact.message_placeholder')}
                      error={errors.message?.message}
                      {...register('message')}
                    />

                    <Button
                      type="submit"
                      variant="gradient"
                      size="lg"
                      className="w-full mt-1"
                      disabled={submitStatus === 'loading'}
                      aria-busy={submitStatus === 'loading'}
                    >
                      {submitStatus === 'loading' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          {t('contact.sending')}
                        </>
                      ) : (
                        t('contact.submit')
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
