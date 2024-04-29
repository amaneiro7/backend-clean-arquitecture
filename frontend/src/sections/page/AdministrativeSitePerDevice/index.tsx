import { Suspense, lazy, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import debounce from 'just-debounce-it'
import { useAppContext } from '../../Context/AppContext'
import { useInputsData } from './useInputData'
import { useDevice } from '../../Device/device/useDevice'
import { Computer } from '../../../modules/devices/fetures/computer/domain/Computer'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { type DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'

import Main from '../../components/Main'
import PageTitle from '../../components/PageTitle'
import Table from '../../components/TableComponent/Table'
import TableBody from '../../components/TableComponent/TableBody'
import TableHead from '../../components/TableComponent/TableHead'
import TableCell from '../../components/TableComponent/TableCell'
import TableHeader from '../../components/TableComponent/TableHeader'
import TableRow from '../../components/TableComponent/TableRow'
import TableCellEditDeleteIcon from '../../components/TableComponent/TableCellEditDeleteIcon'
import { InputSkeletonLoading } from '../../components/Loading/inputSkeletonLoading'
import { SpinnerSKCircle } from '../../components/Loading/spinner-sk-circle'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'

const Button = lazy(async () => await import('../../ui/button'))
const EmployeeComboBox = lazy(async () => await import('../../components/combo_box/EmployeeComboBox'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const LocationComboBox = lazy(async () => await import('../../components/combo_box/LocationComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))
const SerialInput = lazy(async () => await import('../../components/text-inputs/SerialInput'))
const ActivoInput = lazy(async () => await import('../../components/text-inputs/ActivoInput'))


export default function AdministrativeSitePage () {
  const tableRef = useRef(null)
  const { repository } = useAppContext()
  const { devices, loading, addFilter, cleanFilters } = useDevice(repository, {
    filters: [{
      field: 'typeOfSite',
      operator: Operator.EQUAL,
      value: '1'
    }]
  })
  const navigate = useNavigate()
  const { inputData, updateInputData, clearInputs } = useInputsData()

  const debounceGetDevices = useCallback(
    debounce((query: SearchByCriteriaQuery) => {
      addFilter(query)
    }, 300)
    , [addFilter]
  )
  
  const handleChange = (name: string, value: string, operator?: Operator) => {
    const filters = [{
      field: name,
      operator: operator ?? Operator.EQUAL,
      value
    }]
    updateInputData({ name, value })
    debounceGetDevices({ filters })
  }

  const handleClear = () => {
    clearInputs()
    // Modificarlo para que no sea un magic string
    cleanFilters({
      filters: [{
        field: 'typeOfSite',
        operator: Operator.EQUAL,
        value: '1'
      }]
    })
  }

  const defaultHeaderTitle = ['Acciones', 'Usuario', 'Ubicación', 'Categoria', 'Serial', 'Activo', 'Marca', 'Modelo', 'Observaciones']  
  const isComputerFilter = Computer.isComputerCategory({ categoryId: inputData.categoryId })
  const headerTitle: string[] = isComputerFilter
    ? defaultHeaderTitle.concat(['Nombre de Equipo', 'Procesador', 'Memoria Ram', 'Disco Duro', 'Tipo', 'Sistema Operativo', 'Arquitectura', 'Diracción MAC', 'Dirección IP'])
    : defaultHeaderTitle

  return (
    <Main>
      <PageTitle title='Equipos de Torre' />
      <header className="grid grid-cols-[repeat(auto-fit,_250px)] gap-5 place-content-center">        
        <Suspense fallback={<InputSkeletonLoading />}>
          <EmployeeComboBox    
            name='employeeId'
            value={inputData.employeeId}            
            onChange={handleChange}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <CategoryComboBox
            value={inputData.categoryId}
            onChange={handleChange}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <BrandComboBox
            value={inputData.brandId}
            categoryId={inputData.categoryId}
            onChange={handleChange}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <SerialInput
            value={inputData.serial}
            onChange={handleChange}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <ActivoInput
            value={inputData.activo}
            onChange={handleChange}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <ModelComboBox
            value={inputData.modelId}
            brandId={inputData.brandId}
            categoryId={inputData.categoryId}
            onChange={handleChange}
            type='search'
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <LocationComboBox
            value={inputData.locationId}
            typeOfSiteId={'1'} // Modificarlo para que no sea un magic string
            statusId={StatusId.StatusOptions.INUSE} // Modificarlo para que no sea un magic string
            onChange={handleChange}
            type='search'
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <Button
            actionType='CANCEL'
            type='button'
            text='Limpiar'
            handle={handleClear}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <Button
            type='button'
            text='Agregar un nuevo item'
            actionType='ACTION'
            handle={() => { navigate('/device/add') }}
          />
        </Suspense>        
      </header>
      {loading && <SpinnerSKCircle/>}
      {(!loading && devices.length === 0) && <p>No hay resultados</p>}
      {(!loading && devices.length > 0) && <Suspense fallback={<p>...Loading</p>}>
        <Table ref={tableRef} className=''>
          <TableHeader>
            <TableRow>
              {headerTitle.map((title, index) => (
                <TableHead key={index} name={title} />
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
              {(devices as unknown as DevicesMappedApiResponse[]).map((device) => (
                <TableRow key={device?.id}>
                  <TableCellEditDeleteIcon state={device} url={`/device/edit/${device.id}`} />
                  <TableCell value={device.employeeUserName}/>
                  <TableCell value={device.locationName}/>
                  <TableCell value={device.categoryName}/>
                  <TableCell value={device.serial}/>
                  <TableCell value={device.activo}/>
                  <TableCell value={device.brandName}/>
                  <TableCell value={device.modelName}/>
                  <TableCell value={device.observation}/>
                  {isComputerFilter &&
                    <>
                      <TableCell value={device?.computer?.computerName}/>
                      <TableCell value={device?.computer?.processor?.numberModel}/>
                      <TableCell value={device?.computer?.memoryRamCapacity}/>
                      <TableCell value={device?.computer?.hardDriveCapacity?.name}/>
                      <TableCell value={device?.computer?.hardDriveType?.name}/>
                      <TableCell value={device?.computer?.operatingSystem?.name}/>
                      <TableCell value={device?.computer?.operatingSystemArq?.name}/>
                      <TableCell value={device?.computer?.macAddress}/>
                      <TableCell value={device?.computer?.ipAddress}/>
                    </>

                  }
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Suspense>}
    </Main>
  )
}
