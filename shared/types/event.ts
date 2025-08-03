export interface Event {
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
