import { type ComputerFeatures } from '../../Features/domain/Computer/ComputerFeatures'
import { type Mediator } from './Mediator'

export class DeviceMediator implements Mediator {
    const event = {
        
    }
    
  constructor (event:string) {}
    public notify(sender: object, event: string): void {
        if (event === '')
    }
}