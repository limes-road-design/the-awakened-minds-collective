import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { Testimonial, TestimonialData } from './about/Testimonial'
import { Bio, BioData } from './about/Bio'

interface AboutTabProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
  testimonials?: TestimonialData[]
  people?: BioData[]
}

export const AboutTab: FC<AboutTabProps> = ({ testimonials, people, className, ...props }) => {
  return (
    <div
      id="about-tab"
      className={twClassMerge(className, 'flex flex-col items-center justify-center h-full gap-8')}
      {...props}
    >
      {people && (
        <div id="people" className="grid grid-cols-1 gap-20 mb-6 select-text">
          <Bio data={people[0]} />
          <Bio data={people[1]} />
        </div>
      )}
      <div id="mission" className="select-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      {testimonials && (
        <div id="testimonials">
          <div className="grid grid-cols-3 gap-y-6">
            <Testimonial data={testimonials[0]} className="col-span-2 col-start-2" />
            <Testimonial data={testimonials[1]} className="col-span-2 col-start-1" />
            <Testimonial data={testimonials[2]} className="col-span-2 col-start-2" />
          </div>
        </div>
      )}
      <div id="cta" className="flex flex-col items-center my-16">
        <div className="text-center text-2xl font-bold">
          Join us in our mission to lorem ipsum dolor sit amet...
        </div>
        <a
          href="https://www.eventbrite.co.uk/o/the-awakened-minds-collective-114025583671"
          className="inline-block mt-4 px-6 py-2 bg-primary-700 text-white rounded hover:bg-primary-800 no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Involved
        </a>
      </div>
    </div>
  )
}
