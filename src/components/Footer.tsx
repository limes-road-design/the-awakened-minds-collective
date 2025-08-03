/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
  return (
    <footer
      className={twClassMerge(
        className,
        'text-center p-8 pt-4 text-sm text-primary-700 flex flex-col items-center border-t-0 border-primary-400'
      )}
      {...props}
    >
      <span id="notice">No data is collected on this site.</span>
      <span id="copyright" className="mt-2">
        &copy; {new Date().getFullYear()} The Awakened Minds Collective and its licensors. All
        rights reserved.
      </span>
    </footer>
  )
}
