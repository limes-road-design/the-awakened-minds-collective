import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'

interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
  data?: TestimonialData
}

export interface TestimonialData {
  author?: string
  quote: string
}

export const Testimonial: FC<TestimonialProps> = ({ data, className, ...props }) => {
  return (
    <div
      className={twClassMerge(className, 'rounded-lg bg-primary-400 text-center p-2')}
      {...props}
    >
      {data?.quote}
    </div>
  )
}
