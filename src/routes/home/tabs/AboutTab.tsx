import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { Testimonial, TestimonialData } from './about/Testimonial'

interface AboutTabProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
  testimonials?: TestimonialData[]
}

export const AboutTab: FC<AboutTabProps> = ({ testimonials, className, ...props }) => {
  return (
    <div
      id="about-tab"
      className={twClassMerge(className, 'flex flex-col items-center justify-center h-full gap-8')}
      {...props}
    >
      <div id="people"></div>
      <div id="mission"></div>
      {testimonials && (
        <div id="testimonials">
          <div className="grid grid-cols-3 gap-y-6">
            <Testimonial data={testimonials[0]} className="col-span-2 col-start-2" />
            <Testimonial data={testimonials[1]} className="col-span-2 col-start-1" />
            <Testimonial data={testimonials[2]} className="col-span-2 col-start-2" />
          </div>
        </div>
      )}
      <div id="cta"></div>
    </div>
  )
}
