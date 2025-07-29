import type { Config } from '@netlify/functions'
import { getStore } from '@netlify/blobs'
import fetch from 'node-fetch'

// Env vars
const EVENTBRITE_API_KEY = process.env.EVENTBRITE_API_KEY
const EVENTBRITE_ORG_ID = process.env.EVENTBRITE_ORG_ID
const BLOB_STORE_NAME = 'events_data'

interface Event {
  id: string
  name: string
  summary?: string
  description?: string
  url: string
  start: Date
  end: Date
  created: Date
  published: Date
  status: 'draft' | 'live' | 'started' | 'ended' | 'completed' | 'cancelled'
  currency: string // always an ISO 4217 currency code
  online_event: boolean
  hide_start_date: boolean
  hide_end_date: boolean
}

export default async (req: Request) => {
  /*
  const { next_run } = await req.json()

  console.log('Received event! Next invocation at:', next_run)
  */
  if (!EVENTBRITE_API_KEY || !EVENTBRITE_ORG_ID) {
    console.error(
      'Missing API key and/or organiser ID. Please set these environment variables in Netlify.'
    )
    return new Response(
      JSON.stringify({ message: 'Configuration error: Missing API key and/or organiser ID.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    console.log('Fetching events from Eventbrite...')
    const response = await fetch(
      `https://www.eventbrite.com/api/v3/organizations/${EVENTBRITE_ORG_ID}/events/?token=${EVENTBRITE_API_KEY}`
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error ${response.status} occurred when fetching events: ${errorText}`)
      throw new Error(`Error ${response.status} occurred when fetching events: ${errorText}`)
    }

    const data = (await response.json()) as { events: Event[] }
    const events = data.events.map((event: Event) => ({
      id: event.id,
      name: event.name,
      summary: event.summary,
      description: event.description,
      url: event.url,
      start: new Date(event.start),
      end: new Date(event.end),
      created: new Date(event.created),
      published: new Date(event.published),
      status: event.status as Event['status'],
      currency: event.currency,
      online_event: event.online_event,
      hide_start_date: event.hide_start_date,
      hide_end_date: event.hide_end_date
    }))

    // Get the blob store instance
    const blobStore = getStore(BLOB_STORE_NAME)

    // Store the events as a JSON string under a specific key
    await blobStore.setJSON('events', events)
    console.log(
      `Successfully updated blob store "${BLOB_STORE_NAME}" with ${events.length} events.`
    )

    return new Response(JSON.stringify({ message: `Blob updated with ${events.length} events.` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error occurred in update-events function:', error)
    return new Response(JSON.stringify({ message: 'Failed to update events blob.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export const config: Config = {
  // schedule: '@hourly' // Default from template
  schedule: '0 6 * * *' // Every day at 6 AM UTC
}
