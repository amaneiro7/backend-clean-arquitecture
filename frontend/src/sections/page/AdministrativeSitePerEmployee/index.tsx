import { Suspense, lazy, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { useInputsData } from './useInputData'
import { type EmployeeDevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import debounce from 'just-debounce-it'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import PageTitle from '../../components/PageTitle'
import Table from '../../components/TableComponent/Table'
import { TableRow } from '@mui/material'
import TableBody from '../../components/TableComponent/TableBody'
import TableHead from '../../components/TableComponent/TableHead'
import TableCell from '../../components/TableComponent/TableCell'
import TableHeader from '../../components/TableComponent/TableHeader'
import TableCellEditDeleteIcon from '../../components/TableComponent/TableCellEditDeleteIcon'
import { useEmployee } from '../../Device/employee/useEmployee'

const Button = lazy(async () => await import('../../ui/button'))
const BrandSelect = lazy(async () => await import('../../Device/brand/BrandSelect'))
const CategorySelect = lazy(async () => await import('../../Device/category/CategorySelect'))
const SerialInput = lazy(async () => await import('../../Device/device/components/SerialInput'))
const ActivoInput = lazy(async () => await import('../../Device/device/components/ActivoInput'))
const ModelSelect = lazy(async () => await import('../../Device/model/ModelSelect'))
const LocationSelect = lazy(async () => await import('../../Device/location/LocationSelect'))

export default function AdministrativeSitePerEmployee () {
  const { repository } = useAppContext()
  const { employees, loading, addFilter, cleanFilters } = useEmployee(repository)
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

  useEffect(() => {
    cleanFilters({
      filters: [{
        field: 'typeOfSite',
        operator: Operator.EQUAL,
        value: '1'
      }]
    })
  }, [])

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
    <main className='max-w-full h-full flex flex-col gap-5 p-5'>
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
        <Suspense>
          <CategorySelect
            value={inputData.categoryId}
            onChange={handleChange}
          />
        </Suspense>
        <Suspense>
          <BrandSelect
            value={inputData.brandId}
            categoryId={inputData.categoryId}
            onChange={handleChange}
            isForm={false}
          />
        </Suspense>
        <Suspense>
          <SerialInput
            value={inputData.serial}
            onChange={handleChange}
          />
        </Suspense>
        <Suspense>
          <ActivoInput
            value={inputData.activo}
            onChange={handleChange}
          />
        </Suspense>
        <Suspense>
          <ModelSelect
            value={inputData.modelId}
            brandId={inputData.brandId}
            categoryId={inputData.categoryId}
            onChange={handleChange}
            isForm={false}
          />
        </Suspense>
        <Suspense>
          <LocationSelect
            value={inputData.locationId}
            typeOfSiteId={'1'}
            statusId={inputData.statusId}
            onChange={handleChange}
            isForm={false}
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
      {loading && <p>...Loading</p>}
      {(!loading && employees.length === 0) && <p>No hay resultados</p>}
      {(!loading && employees.length > 0) && <Suspense fallback={<p>...Loading</p>}>
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
              {(employees as unknown as EmployeeDevicesMappedApiResponse[]).map((employee) => (
                <TableRow key={employee?.id}>
                  <TableCellEditDeleteIcon state={employee} url={`/employee/edit/${employee.id}`} />
                  <TableCell value={employee?.userName}/>
                  <TableCell value={employee?.locationName}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.computerName).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.operatingSystem.version).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.operatingSystemArq.name).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.ipAddress).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.brand.name).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.category.name).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => `${computer.computer.memoryRamCapacity} Mb`).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => `${computer.computer.hardDriveCapacity.value} Gb`).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.hardDriveType.name).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.serial).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.model.name).join(' / ')}/>
                  <TableCell value={employee?.monitores?.length < 1 ? 'N/A' : employee.monitores.map(monitor => `${monitor.brand.name} ${monitor.model.name}`).join(' / ')}/>
                  <TableCell value={employee?.computers?.length < 1 ? 'N/A' : employee.computers.map(computer => computer.computer.processor.name).join(' / ')}/>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Suspense>}
    </main>
  )
}
