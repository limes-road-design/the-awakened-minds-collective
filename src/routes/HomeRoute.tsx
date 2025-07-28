/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'

interface HomeRouteProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

export const HomeRoute: FC<HomeRouteProps> = ({ className, ...props }) => {
  return (
    <div className={twClassMerge(className, 'text-center p-10')} {...props}>
      <h1 className="text-2xl font-bold">Hello world!</h1>
      <p>This is a blank slate.</p>
    </div>
  )
}
