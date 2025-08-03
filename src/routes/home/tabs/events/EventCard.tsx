import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { Event } from '@shared/types/event'

interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
  event: Event
}

export const EventCard: FC<EventCardProps> = ({ className, ...props }) => {
  return (
    <div className={twClassMerge(className)} {...props}>
      {/* Component content goes here */}
    </div>
  )
}
