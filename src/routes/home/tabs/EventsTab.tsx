/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'

interface EventsTabProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

export const EventsTab: FC<EventsTabProps> = ({ className, ...props }) => {
  return (
    <div
      id="events-tab"
      className={twClassMerge(className, 'flex flex-col items-center justify-center h-full')}
      {...props}
    >
      <h2>Events</h2>
    </div>
  )
}
