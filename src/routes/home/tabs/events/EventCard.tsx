import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { Event } from '@shared/types/event'

interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
  event: Event
}

export const EventCard: FC<EventCardProps> = ({ event, className, ...props }) => {
  return (
    <div
      className={twClassMerge(className, 'bg-primary-400 rounded-lg p-2 flex flex-col gap-2')}
      {...props}
    >
      <img src="https://placehold.co/512x256" className="w-full rounded-sm" />
      <div>
        <h3 className="font-bold">{event.name}</h3>
        <p className="text-sm">{event.summary}</p>
      </div>
      <p className="text-xs text-primary-700">
        {event.start.toLocaleDateString() === event.end.toLocaleDateString()
          ? event.start.toLocaleDateString()
          : `${event.start.toLocaleDateString()} - ${event.end.toLocaleDateString()}`}
      </p>
      <div className="flex justify-center">
        <a
          href={event.url}
          className="inline-block text-sm text-center px-6 py-2 w-full bg-primary-700 text-white rounded hover:bg-primary-800 no-underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book tickets & find out more
        </a>
      </div>
    </div>
  )
}
