import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useModel } from './useMode'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type ModelId } from '../../../modules/devices/model/model/domain/ModelId'
import { type ModelName } from '../../../modules/devices/model/model/domain/ModelName'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'
import { MemoryRamTypeId } from '../../../modules/devices/fetures/memoryRam/memoryRamType/domain/MemoryRamTypeId'
import { MemoryRamSlotQuantity } from '../../../modules/devices/model/ModelCharacteristics/modelComputer/MemoryRamSlotQuantity'
import { ModelPrimitives } from '../../../modules/devices/model/model/domain/Model'
import { BatteryModel } from '../../../modules/devices/model/ModelCharacteristics/modelLaptop/BatteryModel'
import { ScreenSize } from '../../../modules/devices/model/ModelCharacteristics/modelMonitor/ScreenSize'
import { CartridgeModel } from '../../../modules/devices/model/ModelCharacteristics/modelPrinter/CartridgeModel'
import { InputTypeId } from '../../../modules/devices/model/InputType/domain/InputTypeId'
import { HasFingerPrinteReader } from '../../../modules/devices/model/ModelCharacteristics/modelKeyboard/HasFingerPrintReader'

export interface DefaultModelProps {
  id?: Primitives<ModelId>
  name: Primitives<ModelName>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  memoryRamTypeId?: Primitives<MemoryRamTypeId>
  memoryRamSlotQuantity?: Primitives<MemoryRamSlotQuantity>
  hasBluetooth?: boolean
  hasWifiAdapter?: boolean
  hasDVI?: boolean
  hasHDMI?: boolean
  hasVGA?: boolean
  batteryModel?: Primitives<BatteryModel>
  screenSize?: Primitives<ScreenSize>
  cartridgeModel?: Primitives<CartridgeModel>
  inputTypeId?: Primitives<InputTypeId>
  hasFingerPrintReader?: Primitives<HasFingerPrinteReader>
  updatedAt?: string
}
export const defaultInitialModelState: DefaultModelProps = {
  id: undefined,
  name: '',
  categoryId: '',
  brandId: '',
  hasBluetooth: false,
  hasDVI: false,
  hasHDMI: false,
  hasVGA: true,
  hasWifiAdapter: false,
  hasFingerPrintReader: false,
  memoryRamSlotQuantity: MemoryRamSlotQuantity.MIN,
  memoryRamTypeId: '',
  batteryModel: '',
  screenSize: ScreenSize.MIN,
  cartridgeModel: '',
  inputTypeId: '',
  updatedAt: undefined
}
export const useModelInitialState = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { getModel } = useModel()
  const [preloadedModelState, setPreloadedModelState] = useState(defaultInitialModelState)

  const isAddForm = useMemo(() => {
    return location.pathname.includes('add')
  }, [location.pathname])

  useEffect(() => {
    if (isAddForm) {
      setPreloadedModelState(defaultInitialModelState)
      return
    }

    if (location.state?.state !== undefined) {
      const { state: model } = location.state
      setPreloadedModelState(model)
    } else {
      if (id === undefined) {
        navigate('/error')
        return
      }
      getModel.getById({ id })
        .then(model => {
          processModelState(model)
        })
        .catch(error => {
          console.log('useModelInitialState', error)
        })
    }
  }, [id, location.state?.state])

  function processModelState(model: ModelPrimitives): void {
    const { brandId, categoryId, name } = model
    setPreloadedModelState((prev) => ({ ...prev, id, brandId, categoryId, name }))
  }

  return {
    preloadedModelState,
    isAddForm
  }
}
