import { type DomainEvent } from './DomainEvent'
import { type DomainEventName } from './DomainEventName'

export interface DomainEventSubscriber<T extends DomainEvent> {
  on: (domainEvent: T) => Promise<void>

  subscribedTo: () => Array<DomainEventName<T>>
}
