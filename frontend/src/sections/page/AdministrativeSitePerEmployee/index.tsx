import { Suspense, lazy, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import debounce from 'just-debounce-it'

import { useAppContext } from '../../Context/AppContext'
import { useInputsData } from './useInputData'
import { useEmployee } from '../../Device/employee/useEmployee'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'

import { type EmployeeDevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'

import { SpinnerSKCircle } from '../../components/Loading/spinner-sk-circle'
import { InputSkeletonLoading } from'../../components/skeleton/inputSkeletonLoading'

const HeaderInput = lazy(async () => import('../../components/HeaderInput').then(m => ({ default: m.HeaderInput })))
const DownloadTable = lazy(async () => import('../../components/button/DownloadTableExcel').then(m => ({ default: m.DownloadTable })))
const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/PageTitle'))
const Table = lazy(async () => import('../../components/TableComponent/Table'))
const TableHeader = lazy(async () => import('../../components/TableComponent/TableHeader'))
const TableRow = lazy(async () => import('../../components/TableComponent/TableRow'))
const TableBody = lazy(async () => import('../../components/TableComponent/TableBody'))
const TableHead = lazy(async () => import('../../components/TableComponent/TableHead'))
const TableCell = lazy(async () => import('../../components/TableComponent/TableCell'))
const TableCellEditDeleteIcon = lazy(async () => import('../../components/TableComponent/TableCellEditDeleteIcon'))
const Button = lazy(async () => await import('../../ui/button'))
const SerialInput = lazy(async () => await import('../../components/text-inputs/SerialInput'))
const ActivoInput = lazy(async () => await import('../../components/text-inputs/ActivoInput'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const EmployeeComboBox = lazy(async () => await import('../../components/combo_box/EmployeeComboBox'))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const LocationComboBox = lazy(async () => await import('../../components/combo_box/LocationComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))

export default function AdministrativeSitePerEmployee() {
  const { repository } = useAppContext()
  const tableRef = useRef(null)
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
    <Suspense>
      <Main>
        <Suspense>
          <PageTitle title='Usuarios de Torre' />
        </Suspense>
        <Suspense>
          <HeaderInput>
            <Suspense fallback={<InputSkeletonLoading />}>
              <EmployeeComboBox
                name='id'
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
                statusId={StatusId.StatusOptions.INUSE}
                onChange={handleChange}
                type='search'
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <Button
                type='button'
                text='Añadir'
                actionType='ACTION'
                handle={() => { navigate('/device/add') }}
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <Button
                actionType='CLOSE'
                type='button'
                text='Limpiar'
                handle={handleClear}
              />
            </Suspense>
            <Suspense>
              <DownloadTable ref={tableRef} />
            </Suspense>
          </HeaderInput>
        </Suspense>
        {loading && <SpinnerSKCircle />}
        {(!loading && employeeWithDevives.length === 0) && <p>No hay resultados</p>}
        {(!loading && employeeWithDevives.length > 0) && <Suspense fallback={<p>...Loading</p>}>
          <Table ref={tableRef} className=''>
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
                  <TableCell value={employee?.userName} />
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.location.name).join(' / ')} />
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.computerName).join(' / ')} />
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.operatingSystem.name).join(' / ')} />
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.operatingSystemArq.name).join(' / ')} />
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.ipAddress).join(' / ')} />
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.brand.name).join(' / ')} />
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.category.name).join(' / ')} />
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => `${computer.computer.memoryRamCapacity} Gb`).join(' / ')} />
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => `${computer.computer.hardDriveCapacity.name} Gb`).join(' / ')} />
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.hardDriveType.name).join(' / ')} />
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.serial).join(' / ')} />
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.model.name).join(' / ')} />
                  <TableCell value={employee?.monitores?.length < 1 ? 'N/A' : employee.monitores.map(monitor => `${monitor.brand.name} ${monitor.model.name}`).join(' / ')} />
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.processor.numberModel).join(' / ')} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Suspense>}
      </Main>
    </Suspense>
  )
}
