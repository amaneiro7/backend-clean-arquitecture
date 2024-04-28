import { Suspense, lazy, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import debounce from 'just-debounce-it'
import { useAppContext } from '../../Context/AppContext'
import { useInputsData } from './useInputData'
import { useEmployee } from '../../Device/employee/useEmployee'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { type EmployeeDevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'

import Main from '../../components/Main'
import PageTitle from '../../components/PageTitle'
import Table from '../../components/TableComponent/Table'
import TableHeader from '../../components/TableComponent/TableHeader'
import TableRow from '../../components/TableComponent/TableRow'
import TableBody from '../../components/TableComponent/TableBody'
import TableHead from '../../components/TableComponent/TableHead'
import TableCell from '../../components/TableComponent/TableCell'
import TableCellEditDeleteIcon from '../../components/TableComponent/TableCellEditDeleteIcon'
import { InputSkeletonLoading } from '../../components/Loading/inputSkeletonLoading'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { SpinnerSKCircle } from '../../components/Loading/spinner-sk-circle'

const Button = lazy(async () => await import('../../ui/button'))
const SerialInput = lazy(async () => await import('../../Device/device/components/SerialInput'))
const ActivoInput = lazy(async () => await import('../../Device/device/components/ActivoInput'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const EmployeeComboBox = lazy(async () => await import('../../components/combo_box/EmployeeComboBox'))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const LocationComboBox = lazy(async () => await import('../../components/combo_box/LocationComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))

export default function AdministrativeSitePerEmployee () {
  const { repository } = useAppContext()
  const { employeeWithDevives, loadingWithDevice: loading, addFilter, cleanFilters } = useEmployee(repository, {
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
    cleanFilters({
      filters: [{
        field: 'typeOfSite',
        operator: Operator.EQUAL,
        value: '1'
      }]
    })
  }

  return (
    <Main>
      <PageTitle title='Equipos de Torre' />
      <Suspense>
        <Button
          type='button'
          text='Agregar un nuevo item'
          actionType='ACTION'
          handle={() => { navigate('/device/add') }}
        />
      </Suspense>
      <header className="grid grid-cols-[repeat(auto-fit,_250px)] gap-5 place-content-center">
      <Suspense fallback={<InputSkeletonLoading />}>
          <EmployeeComboBox    
            value={inputData.id}            
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
        <Suspense>
          <Button
            actionType='CANCEL'
            type='button'
            text='Limpiar'
            handle={handleClear}
          />
        </Suspense>
      </header>
      {loading && <SpinnerSKCircle/>}
      {(!loading && employeeWithDevives.length === 0) && <p>No hay resultados</p>}
      {(!loading && employeeWithDevives.length > 0) && <Suspense fallback={<p>...Loading</p>}>
        <Table className=''>
          <TableHeader>
            <TableRow>
              <TableHead name='Acciones' />
              <TableHead name='Usuario' />
              <TableHead name='Ubicación' />
              <TableHead name='Nombre de Equipo' />
              <TableHead name='Sistema Operativo' />
              <TableHead name='Arquitectura' />
              <TableHead name='Dirección IP' />
              <TableHead name='Marca' />
              <TableHead name='Categoria' />
              <TableHead name='Memoria Ram' />
              <TableHead name='Disco Duro' />
              <TableHead name='Tipo' />
              <TableHead name='Serial' />
              <TableHead name='Modelo' />
              <TableHead name='Monitores' />
              <TableHead name='Procesador' />
            </TableRow>
          </TableHeader>
          <TableBody>
              {(employeeWithDevives as unknown as EmployeeDevicesMappedApiResponse[]).map((employee) => (
                <TableRow key={employee?.id}>
                  <TableCellEditDeleteIcon state={employee} url={`/employee/edit/${employee.id}`} />
                  <TableCell value={employee?.userName}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.location.name).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.computerName).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.operatingSystem.name).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.operatingSystemArq.name).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.ipAddress).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.brand.name).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.category.name).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => `${computer.computer.memoryRamCapacity} Gb`).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => `${computer.computer.hardDriveCapacity.name} Gb`).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.hardDriveType.name).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.serial).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.model.name).join(' / ')}/>
                  <TableCell value={employee?.monitores?.length < 1 ? 'N/A' : employee.monitores.map(monitor => `${monitor.brand.name} ${monitor.model.name}`).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.processor.numberModel).join(' / ')}/>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Suspense>}
      </Main>
  )
}
