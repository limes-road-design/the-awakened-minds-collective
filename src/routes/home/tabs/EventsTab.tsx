import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { Event } from '@shared/types/event'
import { EventCard } from './events/EventCard'

interface EventsTabProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
  events?: Event[]
  pastPhotos?: string[]
}

export const EventsTab: FC<EventsTabProps> = ({ events, className, ...props }) => {
  return (
    <div
      id="events-tab"
      className={twClassMerge(className, 'flex flex-col items-center justify-center h-full')}
      {...props}
    >
      {events && events.length > 0 ? (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center justify-center items-center flex flex-col w-full gap-4">
          <span>Sorry, we've not got any events planned at the moment...</span>
          <div id="cta-buttons" className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.eventbrite.co.uk/o/the-awakened-minds-collective-114025583671"
              className="inline-block px-6 py-2 bg-primary-700 text-white rounded hover:bg-primary-800 no-underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow us on Eventbrite
            </a>
            <a
              href=""
              className="inline-block px-6 py-2 border-2 border-primary-700 text-primary-700 rounded hover:bg-primary-800 hover:text-white hover:border-primary-800 no-underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our mailing list
            </a>
          </div>
          <div id="past-photos">(Show photos of past events here)</div>
        </div>
      )}
    </div>
  )
}
