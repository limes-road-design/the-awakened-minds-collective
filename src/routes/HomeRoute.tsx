/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { DynamicLogo } from './home/DynamicLogo'

interface HomeRouteProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

export const HomeRoute: FC<HomeRouteProps> = ({ className, ...props }) => {
  return (
    <div className={twClassMerge(className, 'text-center p-10')} {...props}>
      <h1 className="text-2xl font-serif font-bold">Hello world!</h1>
      <p className="font-cursive">This is a blank slate.</p>
      <DynamicLogo
        numberOfLines={47}
        rotationSpeed={0.1}
        maxLineGaps={2}
        lineGapWidth={12}
        startRadius={180}
        minEndRadius={270}
        maxEndRadius={360}
      />
    </div>
  )
}
