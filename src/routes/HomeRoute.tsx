/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { twClassMerge } from '~/utils/tailwind'
//import { Event } from '@shared/types/event'
import { BiLogoInstagram, BiLogoFacebook, BiLogoTiktok } from 'react-icons/bi'
import { Logo } from '~/components/logo/Logo'
import { AboutTab } from './home/tabs/AboutTab'
import { EventsTab } from './home/tabs/EventsTab'
import { Footer } from '~/components/Footer'

interface HomeRouteProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

// Tabs created following tutorial by Emmanuel Alozie
// https://www.youtube.com/watch?v=JWZHoB5Yaps

interface TabProps {
  label: string
  content: ReactNode
}

/*
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dummyEvents: Event[] = [
  {
    id: '1',
    name: 'Creative Arts Retreat',
    start: new Date('2025-12-05T10:00:00Z'),
    summary: 'A weekend retreat to explore your creative side.',
    end: new Date('2025-12-07T16:00:00Z'),
    url: 'https://www.eventbrite.co.uk/o/the-awakened-minds-collective-114025583671',
    created: new Date(),
    published: new Date(),
    status: 'live',
    currency: 'GBP',
    online_event: false,
    hide_start_date: false,
    hide_end_date: false
  },
  {
    id: '2',
    name: 'Mindfulness Workshop',
    start: new Date('2026-01-15T09:00:00Z'),
    summary: 'Learn mindfulness techniques to improve your well-being.',
    end: new Date('2026-01-15T12:00:00Z'),
    url: 'https://www.eventbrite.co.uk/o/the-awakened-minds-collective-114025583671',
    created: new Date(),
    published: new Date(),
    status: 'live',
    currency: 'GBP',
    online_event: true,
    hide_start_date: false,
    hide_end_date: false
  },
  {
    id: '3',
    name: 'Yoga and Meditation Retreat',
    start: new Date('2026-02-20T08:00:00Z'),
    summary: 'A retreat focused on yoga and meditation practices.',
    end: new Date('2026-02-22T17:00:00Z'),
    url: 'https://www.eventbrite.co.uk/o/the-awakened-minds-collective-114025583671',
    created: new Date(),
    published: new Date(),
    status: 'live',
    currency: 'GBP',
    online_event: false,
    hide_start_date: false,
    hide_end_date: false
  }
]
  */

const tabs: TabProps[] = [
  {
    label: 'Events',
    content: <EventsTab events={[]} />
  },
  {
    label: 'About Us',
    content: (
      <AboutTab
        people={[
          {
            name: 'Beth',
            tagline: 'Co-Founder',
            summary:
              "At 30 I realised the life I'd been chasing wasn't the life I truly wanted. So, I left the corporate grind to reconnect with my passions, gifts, and creativity.\nI'm all about manifestation and the transformative practices that have changed my life.",
            imgSrc: 'https://placehold.co/256?text=Image'
          },
          {
            name: 'Suze',
            tagline: 'Co-Founder',
            summary:
              "I've always believed in the power of women supporting each other. That sense of safety and connection inspired me to create a space for women to amplify their strength and create lasting transformation.",
            imgSrc: 'https://placehold.co/256?text=Image'
          }
        ]}
        testimonials={[
          {
            quote:
              'I cannot tell you how much good last night did. I have woken up with a much better state of mind, thank you xx'
          },
          {
            quote:
              'Thank you for such a magical night! I have woken up feeling refreshed and so much lighter this morning.'
          },
          {
            quote:
              "Would highly recommend going to the events. They create a calming and magical atmosphere. They validated my feelings and guided me through my thought process. Can't wait for the next one!"
          }
        ]}
      />
    )
  }
]

export const HomeRoute: FC<HomeRouteProps> = ({ className, ...props }) => {
  const tabRef = useRef<HTMLDivElement | null>(null)
  const [tabWidth, setTabWidth] = useState(0)
  const [activeTab, setActiveTab] = useState(0)

  const updateTabWidth = () => {
    if (tabRef.current) {
      const parentWidth = tabRef.current.getBoundingClientRect().width
      const tabCount = tabs.length
      const newTabWidth = parentWidth / tabCount
      setTabWidth(newTabWidth)
    }
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(updateTabWidth)

    if (tabRef.current) {
      resizeObserver.observe(tabRef.current)
    }

    return () => {
      if (tabRef.current) {
        resizeObserver.unobserve(tabRef.current)
      }
    }
  }, [tabs.length])

  return (
    <div className={twClassMerge(className, 'flex flex-col gap-8 h-full')} {...props}>
      <div id="header" className="grid grid-cols-3">
        <div id="left" className="flex flex-col justify-center items-center"></div>
        <div id="center" className="flex flex-col justify-center items-center p-2">
          <Logo />
          <div id="socials" className="flex gap-4 -mt-10 z-30 relative">
            <a
              className="size-10 transition-colors duration-150"
              href="https://instagram.com/theawakenedmindscollective"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoInstagram className="size-full" />
            </a>
            <a
              className="size-10 transition-colors duration-150"
              href="https://facebook.com/profile.php?id=61577785949195"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoFacebook className="size-full" />
            </a>
            <a
              className="size-10 transition-colors duration-150"
              href="https://tiktok.com/@awakenedmindscollective"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoTiktok className="size-full" />
            </a>
          </div>
        </div>
        <div id="right" className="flex flex-col justify-center items-center p-2"></div>
      </div>
      <div id="content">
        <div
          id="tabs"
          className="w-full max-w-2xl mx-auto flex items-center justify-between relative rounded-full"
          ref={tabRef}
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              className="relative py-3 z-10 font-semibold font-serif text-2xl uppercase"
              style={{
                width: tabWidth
              }}
              onClick={() => {
                setActiveTab(index)
              }}
            >
              <span className="hover:text-primary-700 hover:cursor-pointer disabled:hover:cursor-not-allowed transition-colors">
                {tab.label}
              </span>
            </button>
          ))}
          <div
            id="tab-indicator"
            className="absolute left-0 bottom-0 h-0.5 bg-primary-600 transition-all duration-200"
            style={{
              width: '4.5rem',
              left: activeTab * tabWidth + (tabWidth - 64) / 2
            }}
          />
        </div>
      </div>
      <div id="tab-content" className="w-full max-w-2xl mx-auto p-4 flex-1">
        {tabs[activeTab].content}
      </div>
      <Footer />
    </div>
  )
}
