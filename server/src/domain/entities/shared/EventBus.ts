/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/ban-types */
export interface Registry {
  unregister: () => void
}

export type Callable = Record<string, Function>

export type Subscriber = Record<string, Callable>

export interface IEventBus {
  dispatch: <T>(event: string, arg?: T) => void
  register: (event: string, callback: Function) => Registry
}

export class EventBus implements IEventBus {
  private subscribers: Subscriber
  private static nextId = 0

  constructor () {
    this.subscribers = {}
  }

  public dispatch<T>(event: string, arg?: T): void {
    const subscriber = this.subscribers[event]

    if (subscriber === undefined) {
      return
    }

    Object.keys(subscriber).forEach((key) => subscriber[key](arg))
  }

  public register (event: string, callback: Function): Registry {
    const id = this.getNextId()
    if (!this.subscribers[event]) this.subscribers[event] = {}

    this.subscribers[event][id] = callback

    return {
      unregister: () => {
        delete this.subscribers[event][id]
        if (Object.keys(this.subscribers[event]).length === 0) { delete this.subscribers[event] }
      }
    }
  }

  private getNextId (): number {
    return EventBus.nextId++
  }
}
