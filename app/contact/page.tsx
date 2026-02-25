'use client'

import { useState, useEffect } from 'react'
import TrustSection from '@/components/TrustSection'

const PHONE = '(833) 435-6610'
const PHONE_HREF = 'tel:8334356610'
const EMAIL = 'info@portabletoiletschamp.com'

const projectTypes = [
  { value: '', label: 'Select project type' },
  { value: 'event', label: 'Event' },
  { value: 'construction', label: 'Construction Site' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'festival', label: 'Festival' },
  { value: 'emergency', label: 'Emergency' },
  { value: 'other', label: 'Other' },
]

const unitTypes = [
  { value: '', label: 'Select unit type' },
  { value: 'standard', label: 'Standard Portable Toilet' },
  { value: 'deluxe', label: 'Deluxe/Flushable Unit' },
  { value: 'ada', label: 'ADA Accessible' },
  { value: 'handwashing', label: 'Handwashing Station' },
  { value: 'not-sure', label: 'Not Sure' },
]

const contactMethods = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Call Us',
    description: 'Speak with our team directly',
    value: PHONE,
    href: PHONE_HREF,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Email Us',
    description: 'Get a response within 24 hours',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
]

interface FormData {
  zipCode: string
  projectType: string
  unitType: string
  firstName: string
  email: string
  phone: string
}

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formStartTime, setFormStartTime] = useState<number>(0)
  const [formData, setFormData] = useState<FormData>({
    zipCode: '',
    projectType: '',
    unitType: '',
    firstName: '',
    email: '',
    phone: '',
  })

  const [locationContext, setLocationContext] = useState<{ city: string; state: string } | null>(null)

  // Set form start time and auto-fill from URL params when component mounts
  useEffect(() => {
    setFormStartTime(Date.now())

    // Auto-fill from URL params (e.g., /contact?zip=90210&project=construction&unit=standard&city=Chicago&state=IL)
    const urlParams = new URLSearchParams(window.location.search)
    const zipParam = urlParams.get('zip')
    const projectParam = urlParams.get('project')
    const unitParam = urlParams.get('unit')
    const cityParam = urlParams.get('city')
    const stateParam = urlParams.get('state')

    if (cityParam) {
      setLocationContext({ city: cityParam, state: stateParam || '' })
    }

    if (zipParam && /^\d{5}$/.test(zipParam)) {
      setFormData(prev => ({ ...prev, zipCode: zipParam }))
      // Skip to step 2 if zip is pre-filled
      setCurrentStep(2)
    }

    if (projectParam && projectTypes.some(p => p.value === projectParam)) {
      setFormData(prev => ({ ...prev, projectType: projectParam }))
    }

    // Map unit IDs from comparison table to form values
    const unitMapping: Record<string, string> = {
      'standard': 'standard',
      'deluxe': 'deluxe',
      'ada': 'ada',
      'luxury': 'not-sure', // Luxury trailers need special handling
    }
    if (unitParam && unitMapping[unitParam]) {
      setFormData(prev => ({ ...prev, unitType: unitMapping[unitParam] }))
    }
  }, [])

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const canProceedStep1 = formData.zipCode.length >= 5
  const canProceedStep2 = formData.projectType !== '' && formData.unitType !== ''
  const canSubmit = formData.firstName.trim() !== '' && formData.email.trim() !== '' && formData.phone.trim() !== ''

  const handleSubmit = async () => {
    // Honeypot check - if honeypot field is filled, silently reject
    const honeypot = (document.getElementById('website') as HTMLInputElement)?.value
    if (honeypot) {
      setFormStatus('success') // Fake success for bots
      return
    }

    // Timestamp validation - reject if submitted too quickly (under 3 seconds)
    const timeSpent = Date.now() - formStartTime
    if (timeSpent < 3000) {
      setFormStatus('success') // Fake success for bots
      return
    }

    setFormStatus('submitting')

    const submissionData = {
      zipCode: formData.zipCode,
      projectType: formData.projectType,
      unitType: formData.unitType,
      firstName: formData.firstName,
      email: formData.email,
      phone: formData.phone,
      timestamp: new Date().toISOString(),
      timeOnForm: Math.round(timeSpent / 1000) + ' seconds',
    }

    try {
      // Send to n8n webhook (fire and forget)
      fetch('https://timefreedom.app.n8n.cloud/webhook/d131c6a9-96f2-44ec-8405-1fb7356cc99b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      }).catch(() => null)

      // Send email via Web3Forms
      const web3FormData = new FormData()
      web3FormData.append('access_key', '04e455b1-736f-43f1-a84e-75eb649f1c43')
      web3FormData.append('subject', `New Quote Request: ${formData.firstName} - ${formData.projectType} - ${formData.zipCode}`)
      web3FormData.append('from_name', 'Portable Toilets Champ Website')
      web3FormData.append('to', 'info@portabletoiletschamp.com')
      web3FormData.append('bcc', 'Garrett@primedumpster.com, leads@primedumpster.com')

      // Add all form fields
      web3FormData.append('Zip Code', formData.zipCode)
      web3FormData.append('Project Type', formData.projectType)
      web3FormData.append('Unit Type', formData.unitType)
      web3FormData.append('First Name', formData.firstName)
      web3FormData.append('Email', formData.email)
      web3FormData.append('Phone', formData.phone)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData
      })

      const result = await response.json()

      if (result.success) {
        setFormStatus('success')
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    setFormStatus('idle')
    setFormStartTime(Date.now())
    setFormData({
      zipCode: '',
      projectType: '',
      unitType: '',
      firstName: '',
      email: '',
      phone: '',
    })
  }

  const StepIndicator = () => (
    <div className="mb-8">
      {/* Large progress bar - shows completion percentage */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-navy-600 mb-2">
          <span>Progress</span>
          <span className="text-teal-600">{Math.round((currentStep / 3) * 100)}% Complete</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base transition-all shadow-sm ${
                currentStep > step
                  ? 'bg-teal-500 text-white'
                  : currentStep === step
                  ? 'bg-navy-900 text-white ring-4 ring-navy-100'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {currentStep > step ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step
              )}
            </div>
            {step < 3 && (
              <div
                className={`flex-1 h-1.5 mx-3 rounded-full transition-all ${
                  currentStep > step ? 'bg-teal-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-navy-500 px-1">
        <span className={currentStep >= 1 ? 'text-navy-900 font-medium' : ''}>Location</span>
        <span className={currentStep >= 2 ? 'text-navy-900 font-medium' : ''}>Details</span>
        <span className={currentStep >= 3 ? 'text-navy-900 font-medium' : ''}>Contact</span>
      </div>
    </div>
  )

  const SuccessScreen = () => (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-navy-900 mb-2">Quote Request Received!</h2>
      <p className="text-navy-600 mb-2">
        Thank you, {formData.firstName}! We&apos;re reviewing your request for zip code {formData.zipCode}.
      </p>
      <p className="text-sm text-teal-700 font-medium mb-8">
        Most customers hear back within 15 minutes.
      </p>

      <div className="bg-navy-900 rounded-xl p-6 mb-4">
        <p className="text-navy-300 text-sm mb-4">Need it faster? Call our dispatch team directly:</p>
        <a
          href={PHONE_HREF}
          className="flex items-center justify-center gap-3 bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors w-full"
        >
          <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call {PHONE}
        </a>
      </div>

      <button
        type="button"
        onClick={resetForm}
        className="text-teal-600 hover:text-teal-700 font-medium text-sm"
      >
        Submit another request
      </button>
    </div>
  )

  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge bg-teal-500/20 text-teal-400 mb-4">Get a Quote</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Portable Toilet Rental Quote
            </h1>
            <p className="text-lg text-navy-300 mb-8">
              Get an instant quote in 3 easy steps. Fast, free, no obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-navy-400">
              {['Free quotes', 'Same-day delivery', 'All 50 states'].map((point) => (
                <span key={point} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {point}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
                {formStatus === 'success' ? (
                  <SuccessScreen />
                ) : (
                  <>
                    <StepIndicator />

                    {/* Step 1: Location */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        {locationContext && (
                          <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-lg px-4 py-3">
                            <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-sm text-teal-800 font-medium">
                              Checking availability in {locationContext.city}{locationContext.state ? `, ${locationContext.state}` : ''} — enter your zip to confirm
                            </p>
                          </div>
                        )}
                        <div>
                          <label htmlFor="zipCode" className="input-label">Zip Code *</label>
                          <input
                            type="text"
                            id="zipCode"
                            value={formData.zipCode}
                            onChange={(e) => updateFormData('zipCode', e.target.value.replace(/\D/g, '').slice(0, 5))}
                            className="input text-lg"
                            placeholder="Enter your zip code"
                            maxLength={5}
                            autoComplete="postal-code"
                            autoFocus
                          />
                          <p className="text-sm text-navy-500 mt-2">We&apos;ll check availability in your area</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          disabled={!canProceedStep1}
                          className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Check Availability →
                        </button>
                      </div>
                    )}

                    {/* Step 2: Project Details */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        {/* Urgency Banner — persistent at top */}
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
                          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="text-sm text-amber-800 font-medium">
                            Only 3 delivery slots left for tomorrow in your area!
                          </p>
                        </div>

                        <div>
                          <label htmlFor="projectType" className="input-label">Project Type *</label>
                          <select
                            id="projectType"
                            value={formData.projectType}
                            onChange={(e) => updateFormData('projectType', e.target.value)}
                            className="input"
                          >
                            {projectTypes.map((type) => (
                              <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Unit Type — Card selectors */}
                        <div>
                          <label className="input-label">Unit Type *</label>
                          <div className="grid grid-cols-1 gap-3 mt-2">
                            {[
                              { value: 'standard', icon: '🏗️', label: 'Standard', desc: 'Basic & durable — ideal for job sites', price: '$', limited: false },
                              { value: 'deluxe', icon: '🥂', label: 'Deluxe / Flushable', desc: 'Flushing toilet + hand sink — great for events', price: '$$', limited: false },
                              { value: 'ada', icon: '♿', label: 'ADA Accessible', desc: 'Wheelchair ramp + wide door', price: '$$', limited: false },
                              { value: 'handwashing', icon: '🚿', label: 'Handwashing Station', desc: 'Standalone hand wash unit', price: '$', limited: false },
                              { value: 'not-sure', icon: '💬', label: 'Not Sure', desc: 'We\'ll help you pick the right unit', price: '', limited: false },
                            ].map((unit) => (
                              <button
                                key={unit.value}
                                type="button"
                                onClick={() => updateFormData('unitType', unit.value)}
                                className={`relative flex items-center gap-4 w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                                  formData.unitType === unit.value
                                    ? 'border-teal-500 bg-teal-50 shadow-sm'
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                <span className="text-2xl flex-shrink-0">{unit.icon}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-navy-900 text-sm">{unit.label}</span>
                                    {unit.price && (
                                      <span className="text-xs font-bold text-teal-600">{unit.price}</span>
                                    )}
                                    {unit.limited && (
                                      <span className="text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                                        Limited
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-navy-500 mt-0.5">{unit.desc}</p>
                                </div>
                                {formData.unitType === unit.value && (
                                  <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="btn-secondary flex-1 py-3"
                          >
                            ← Back
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(3)}
                            disabled={!canProceedStep2}
                            className="btn-primary flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Continue →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Contact Info */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="firstName" className="input-label">First Name *</label>
                          <input
                            type="text"
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => updateFormData('firstName', e.target.value)}
                            className="input"
                            placeholder="John"
                            autoComplete="given-name"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="input-label">Email Address *</label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            className="input"
                            placeholder="john@example.com"
                            autoComplete="email"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="input-label">Phone Number *</label>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            className="input"
                            placeholder="(555) 123-4567"
                            autoComplete="tel"
                          />
                        </div>

                        {/* Honeypot field - hidden from users, visible to bots */}
                        <input
                          type="text"
                          id="website"
                          name="website"
                          style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
                          tabIndex={-1}
                          autoComplete="off"
                        />

                        {formStatus === 'error' && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                            There was an error submitting your request. Please try again or call us directly.
                          </div>
                        )}

                        {/* Trust Badges — above submit for last-moment reassurance */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <TrustSection variant="compact" />
                        </div>

                        {/* Callback expectation */}
                        <div className="flex items-center gap-2 text-sm text-navy-600">
                          <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Our team typically calls back within <strong className="text-navy-900 mx-1">15 minutes</strong> with your custom quote.
                        </div>

                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="btn-secondary flex-1 py-3"
                          >
                            ← Back
                          </button>
                          <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!canSubmit || formStatus === 'submitting'}
                            className="btn-primary flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {formStatus === 'submitting' ? (
                              <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Submitting...
                              </span>
                            ) : (
                              'Check Availability & Pricing →'
                            )}
                          </button>
                        </div>

                        <p className="text-center text-sm text-navy-500">
                          By submitting, you agree to receive a call from our team. No spam, ever.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Methods */}
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  className="block bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="feature-icon flex-shrink-0">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 mb-1">{method.title}</h3>
                      <p className="text-sm text-navy-500 mb-2">{method.description}</p>
                      <span className="text-teal-600 font-medium">{method.value}</span>
                    </div>
                  </div>
                </a>
              ))}

              {/* Trust Card */}
              <div className="bg-navy-100 rounded-xl p-6">
                <h3 className="font-bold text-navy-900 mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  {[
                    'Response within minutes',
                    'Transparent pricing',
                    'Flexible delivery',
                    'Professional service',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-navy-700">
                      <svg className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-bold text-navy-900 mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-navy-600">Monday - Friday</span>
                    <span className="font-medium text-navy-900">7:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-navy-600">Saturday</span>
                    <span className="font-medium text-navy-900">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-navy-600">Sunday</span>
                    <span className="font-medium text-navy-900">9:00 AM - 5:00 PM</span>
                  </div>
                </div>
                <p className="text-xs text-navy-500 mt-4">
                  Emergency service available 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-gray-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Common Questions</h2>
            <p className="text-navy-600">Quick answers to help you get started.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'How quickly can you deliver?',
                a: 'Same-day delivery is available in most areas. For planned events, we recommend booking at least 48 hours in advance.',
              },
              {
                q: 'What is included in the rental price?',
                a: 'Delivery, setup, servicing, and pickup are all included. No hidden fees or surprise charges.',
              },
              {
                q: 'How many units do I need?',
                a: 'A good rule of thumb is 1 unit per 50 guests for events up to 4 hours. We can help you determine the right number.',
              },
              {
                q: 'Do you serve my area?',
                a: 'We serve all 50 states with locations throughout the country. Tell us your location and we will confirm availability.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-navy-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-navy-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
