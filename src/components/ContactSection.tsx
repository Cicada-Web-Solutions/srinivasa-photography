import { useEffect, useState, type FormEvent } from 'react';
import { Check, Copy, Mail, MapPin, MessageCircle, Phone, Send, AlertCircle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface ContactSectionProps {
  preselectedEventType: string;
}

interface FormValues {
  fullName: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

interface SubmissionSummary {
  channel: 'email' | 'whatsapp';
  formattedText: string;
  dispatchedExternally: boolean;
}

export function ContactSection({ preselectedEventType }: ContactSectionProps) {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    phone: '',
    email: '',
    eventType: preselectedEventType || siteConfig.contact.eventTypes[0],
    eventDate: '',
    eventLocation: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [submission, setSubmission] = useState<SubmissionSummary | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedEventType) {
      setValues((prev) => ({ ...prev, eventType: preselectedEventType }));
    }
  }, [preselectedEventType]);

  const validate = (form: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    const digitsOnly = form.phone.replace(/\D/g, '');
    if (!form.phone.trim() || digitsOnly.length < 7 || digitsOnly.length > 15) {
      nextErrors.phone = 'Please enter a valid contact phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!form.eventType.trim()) {
      nextErrors.eventType = 'Please select an event category.';
    }

    if (!form.eventDate.trim()) {
      nextErrors.eventDate = 'Please choose your celebration date.';
    }

    if (!form.eventLocation.trim() || form.eventLocation.trim().length < 2) {
      nextErrors.eventLocation = 'Please enter the city or venue location.';
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = 'Please share a few details about your celebration (at least 10 characters).';
    }

    return nextErrors;
  };

  const handleFieldChange = (field: keyof FormValues, value: string) => {
    const updated = { ...values, [field]: value };
    setValues(updated);
    if (hasAttemptedSubmit) {
      setErrors(validate(updated));
    }
  };

  const buildFormattedMessage = (form: FormValues): string => {
    return [
      `SRINIVASA PHOTOGRAPHY — BOOKING ENQUIRY`,
      `----------------------------------------`,
      `Name: ${form.fullName.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Email: ${form.email.trim()}`,
      `Event Type: ${form.eventType}`,
      `Event Date: ${form.eventDate}`,
      `Event Location: ${form.eventLocation.trim()}`,
      ``,
      `Story & Notes:`,
      `${form.message.trim()}`,
    ].join('\n');
  };

  const processEnquiry = (channel: 'email' | 'whatsapp') => {
    setHasAttemptedSubmit(true);
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmission(null);
      return;
    }

    const formattedText = buildFormattedMessage(values);
    let dispatchedExternally = false;

    if (channel === 'email' && siteConfig.contact.email) {
      const subject = encodeURIComponent(
        `Booking Enquiry: ${values.eventType} — ${values.fullName.trim()}`
      );
      const body = encodeURIComponent(formattedText);
      window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
      dispatchedExternally = true;
    } else if (channel === 'whatsapp' && siteConfig.contact.whatsappNumber) {
      const text = encodeURIComponent(formattedText);
      window.open(
        `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${text}`,
        '_blank',
        'noopener,noreferrer'
      );
      dispatchedExternally = true;
    }

    setSubmission({
      channel,
      formattedText,
      dispatchedExternally,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    processEnquiry('email');
  };

  const handleCopy = async () => {
    if (!submission) return;
    try {
      await navigator.clipboard.writeText(submission.formattedText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback ignored if clipboard unavailable
    }
  };

  const errorCount = Object.keys(errors).length;

  return (
    <section
      id="contact"
      className="relative bg-[#102923] text-[#F5F0E5] py-24 sm:py-32 lg:py-36 border-t border-[#C6A64D]/20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
          {/* Left Editorial Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-[#C6A64D]" />
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#C6A64D]">
                  RESERVE YOUR DATE
                </span>
              </div>

              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.06] text-[#F5F0E5]">
                Let&apos;s create something unforgettable.
              </h2>

              <p className="mt-6 text-base sm:text-lg font-light leading-relaxed text-[#D9CEB8]">
                Tell us about your celebration. We&apos;d love to be part of your story.
              </p>

              {/* Configurable Contact Details */}
              <div className="mt-12 space-y-6 border-t border-[#C6A64D]/20 pt-8">
                <div className="flex items-start gap-4">
                  <Phone className="h-4 w-4 text-[#C6A64D] mt-1 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#C6A64D]">
                      Phone
                    </p>
                    <p className="mt-1 text-sm text-[#D9CEB8]">
                      {siteConfig.contact.phone || siteConfig.contact.phoneDisplay}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-4 w-4 text-[#C6A64D] mt-1 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#C6A64D]">
                      Email
                    </p>
                    <p className="mt-1 text-sm text-[#D9CEB8]">
                      {siteConfig.contact.email || siteConfig.contact.emailDisplay}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-4 w-4 text-[#C6A64D] mt-1 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#C6A64D]">
                      Studio
                    </p>
                    <p className="mt-1 text-sm text-[#D9CEB8]">
                      {siteConfig.contact.locationDisplay}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 border border-[#C6A64D]/25 bg-[#183A34]/45 p-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#C6A64D] mb-2">
                Direct Enquiry Channels
              </p>
              <p className="text-xs leading-relaxed text-[#D9CEB8]/90">
                This preview uses a direct email &amp; WhatsApp enquiry workflow configured via{' '}
                <code className="text-[#F5F0E5]">siteConfig.ts</code> rather than storing client data on a server.
              </p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <form
              noValidate
              onSubmit={handleSubmit}
              className="border border-[#C6A64D]/25 bg-[#183A34]/35 p-6 sm:p-10 lg:p-12"
            >
              {hasAttemptedSubmit && errorCount > 0 && (
                <div
                  role="alert"
                  className="mb-8 flex items-start gap-3 border border-amber-400/50 bg-amber-950/40 p-4 text-xs sm:text-sm text-amber-100"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-[#C6A64D] mt-0.5" />
                  <span>
                    Please review the highlighted fields below ({errorCount}{' '}
                    {errorCount === 1 ? 'item requires' : 'items require'} attention).
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="fullName"
                    className="block text-[11px] uppercase tracking-[0.22em] text-[#D9CEB8] mb-2"
                  >
                    Full Name <span className="text-[#C6A64D]">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={values.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    placeholder="Your full name"
                    aria-invalid={Boolean(errors.fullName)}
                    className={`w-full border bg-[#102923]/75 px-4 py-3.5 text-sm text-[#F5F0E5] placeholder:text-[#D9CEB8]/40 focus:outline-none transition-colors ${
                      errors.fullName
                        ? 'border-amber-400 focus:border-amber-300'
                        : 'border-[#C6A64D]/30 focus:border-[#C6A64D]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-amber-300">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[11px] uppercase tracking-[0.22em] text-[#D9CEB8] mb-2"
                  >
                    Phone Number <span className="text-[#C6A64D]">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    placeholder="+91 00000 00000"
                    aria-invalid={Boolean(errors.phone)}
                    className={`w-full border bg-[#102923]/75 px-4 py-3.5 text-sm text-[#F5F0E5] placeholder:text-[#D9CEB8]/40 focus:outline-none transition-colors ${
                      errors.phone
                        ? 'border-amber-400 focus:border-amber-300'
                        : 'border-[#C6A64D]/30 focus:border-[#C6A64D]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-amber-300">{errors.phone}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] uppercase tracking-[0.22em] text-[#D9CEB8] mb-2"
                  >
                    Email Address <span className="text-[#C6A64D]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    className={`w-full border bg-[#102923]/75 px-4 py-3.5 text-sm text-[#F5F0E5] placeholder:text-[#D9CEB8]/40 focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-amber-400 focus:border-amber-300'
                        : 'border-[#C6A64D]/30 focus:border-[#C6A64D]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-amber-300">{errors.email}</p>
                  )}
                </div>

                {/* Event Type */}
                <div>
                  <label
                    htmlFor="eventType"
                    className="block text-[11px] uppercase tracking-[0.22em] text-[#D9CEB8] mb-2"
                  >
                    Event Type <span className="text-[#C6A64D]">*</span>
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={values.eventType}
                    onChange={(e) => handleFieldChange('eventType', e.target.value)}
                    aria-invalid={Boolean(errors.eventType)}
                    className="w-full border border-[#C6A64D]/30 bg-[#102923] px-4 py-3.5 text-sm text-[#F5F0E5] focus:border-[#C6A64D] focus:outline-none transition-colors"
                  >
                    {siteConfig.contact.eventTypes.map((type) => (
                      <option key={type} value={type} className="bg-[#102923] text-[#F5F0E5]">
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <p className="mt-1.5 text-xs text-amber-300">{errors.eventType}</p>
                  )}
                </div>

                {/* Event Date */}
                <div>
                  <label
                    htmlFor="eventDate"
                    className="block text-[11px] uppercase tracking-[0.22em] text-[#D9CEB8] mb-2"
                  >
                    Event Date <span className="text-[#C6A64D]">*</span>
                  </label>
                  <input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={values.eventDate}
                    onChange={(e) => handleFieldChange('eventDate', e.target.value)}
                    aria-invalid={Boolean(errors.eventDate)}
                    className={`w-full border bg-[#102923]/75 px-4 py-3.5 text-sm text-[#F5F0E5] focus:outline-none transition-colors [color-scheme:dark] ${
                      errors.eventDate
                        ? 'border-amber-400 focus:border-amber-300'
                        : 'border-[#C6A64D]/30 focus:border-[#C6A64D]'
                    }`}
                  />
                  {errors.eventDate && (
                    <p className="mt-1.5 text-xs text-amber-300">{errors.eventDate}</p>
                  )}
                </div>

                {/* Event Location */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="eventLocation"
                    className="block text-[11px] uppercase tracking-[0.22em] text-[#D9CEB8] mb-2"
                  >
                    Event Location <span className="text-[#C6A64D]">*</span>
                  </label>
                  <input
                    id="eventLocation"
                    name="eventLocation"
                    type="text"
                    value={values.eventLocation}
                    onChange={(e) => handleFieldChange('eventLocation', e.target.value)}
                    placeholder="City, temple, or celebration venue"
                    aria-invalid={Boolean(errors.eventLocation)}
                    className={`w-full border bg-[#102923]/75 px-4 py-3.5 text-sm text-[#F5F0E5] placeholder:text-[#D9CEB8]/40 focus:outline-none transition-colors ${
                      errors.eventLocation
                        ? 'border-amber-400 focus:border-amber-300'
                        : 'border-[#C6A64D]/30 focus:border-[#C6A64D]'
                    }`}
                  />
                  {errors.eventLocation && (
                    <p className="mt-1.5 text-xs text-amber-300">{errors.eventLocation}</p>
                  )}
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-[11px] uppercase tracking-[0.22em] text-[#D9CEB8] mb-2"
                  >
                    Message <span className="text-[#C6A64D]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                    placeholder="Share your ceremony schedule, vision, or any special rituals you would like us to capture..."
                    aria-invalid={Boolean(errors.message)}
                    className={`w-full border bg-[#102923]/75 px-4 py-3.5 text-sm text-[#F5F0E5] placeholder:text-[#D9CEB8]/40 focus:outline-none transition-colors resize-y ${
                      errors.message
                        ? 'border-amber-400 focus:border-amber-300'
                        : 'border-[#C6A64D]/30 focus:border-[#C6A64D]'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-amber-300">{errors.message}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex flex-1 items-center justify-center gap-3 border border-[#C6A64D] bg-[#C6A64D] px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#102923] transition-all duration-300 hover:bg-[#F5F0E5] hover:border-[#F5F0E5] cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>SEND AN ENQUIRY</span>
                </button>

                <button
                  type="button"
                  onClick={() => processEnquiry('whatsapp')}
                  className="inline-flex items-center justify-center gap-3 border border-[#C6A64D]/60 bg-transparent px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#C6A64D] transition-all duration-300 hover:border-[#C6A64D] hover:bg-[#C6A64D]/10 cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Enquiry</span>
                </button>
              </div>

              {/* Transparent Submission Result */}
              {submission && (
                <div
                  role="status"
                  className="mt-8 border border-[#C6A64D]/50 bg-[#102923] p-6 text-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[#C6A64D] font-semibold">
                        {submission.dispatchedExternally
                          ? `Enquiry Prepared for ${
                              submission.channel === 'whatsapp' ? 'WhatsApp' : 'Email'
                            }`
                          : 'Enquiry Formatted & Ready'}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[#D9CEB8]">
                        {submission.dispatchedExternally
                          ? `Your ${
                              submission.channel === 'whatsapp' ? 'WhatsApp chat' : 'email draft'
                            } has been launched with the details below.`
                          : `Direct ${
                              submission.channel === 'whatsapp' ? 'WhatsApp number' : 'studio email'
                            } is currently awaiting configuration in siteConfig.ts. Copy your formatted enquiry below or connect directly via Instagram.`}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex shrink-0 items-center gap-1.5 border border-[#C6A64D]/40 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-[#C6A64D] hover:bg-[#C6A64D] hover:text-[#102923] transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="mt-4 whitespace-pre-wrap border-t border-[#C6A64D]/20 pt-4 font-sans text-xs leading-relaxed text-[#F5F0E5]/85">
                    {submission.formattedText}
                  </pre>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
