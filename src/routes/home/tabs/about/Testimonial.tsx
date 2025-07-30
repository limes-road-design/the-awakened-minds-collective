import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from 'react-icons/bi'

interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
  data: TestimonialData
}

export interface TestimonialData {
  author?: string
  quote: string
}

export const Testimonial: FC<TestimonialProps> = ({ data, className, ...props }) => {
  return (
    <div className={twClassMerge(className, 'relative')} {...props}>
      <div className="absolute rounded-lg bg-primary-400 text-center p-2 size-full" />
      <span className="absolute w-auto h-12 -left-3 -top-3 text-primary-600">
        <BiSolidQuoteAltLeft className="size-full" />
      </span>
      <span className="absolute w-auto h-12 -right-3 -bottom-3 text-primary-600">
        <BiSolidQuoteAltRight className="size-full" />
      </span>
      <p id="quote" className="relative z-10 p-8 select-text">
        {data.quote}
      </p>
    </div>
  )
}
