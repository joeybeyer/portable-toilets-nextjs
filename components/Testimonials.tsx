'use client'

import { Testimonial, getFeaturedTestimonials, getTestimonialsByUseCase } from '@/data/testimonials'

interface TestimonialsProps {
  useCase?: Testimonial['useCase']
  count?: number
  title?: string
  subtitle?: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
      <StarRating rating={testimonial.rating} />

      <blockquote className="mt-4 flex-grow">
        <p className="text-navy-700 leading-relaxed">
          "{testimonial.review}"
        </p>
      </blockquote>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="font-semibold text-navy-900">{testimonial.author}</div>
        {testimonial.role && (
          <div className="text-sm text-navy-600">
            {testimonial.role}
            {testimonial.company && `, ${testimonial.company}`}
          </div>
        )}
        <div className="text-sm text-navy-500 mt-1">{testimonial.location}</div>
      </div>
    </div>
  )
}

export default function Testimonials({
  useCase,
  count = 3,
  title = 'What Our Customers Say',
  subtitle = 'Join thousands of satisfied customers across all 50 states'
}: TestimonialsProps) {
  const testimonialsList = useCase
    ? getTestimonialsByUseCase(useCase).slice(0, count)
    : getFeaturedTestimonials(count)

  if (testimonialsList.length === 0) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <StarRating rating={5} />
            <span className="text-navy-700 font-medium">4.9 out of 5</span>
            <span className="text-navy-500">based on 2,847 reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonialsList.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-4 text-sm text-navy-600">
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified Reviews
            </span>
            <span className="w-1 h-1 bg-navy-400 rounded-full"></span>
            <span>15,000+ Successful Deliveries</span>
            <span className="w-1 h-1 bg-navy-400 rounded-full"></span>
            <span>50 States Served</span>
          </div>
        </div>
      </div>
    </section>
  )
}
