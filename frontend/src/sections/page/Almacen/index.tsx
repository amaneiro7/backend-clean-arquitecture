import { Suspense, lazy, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import debounce from 'just-debounce-it'

import { useInputsData } from './useInputData'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { useDevice } from '../../Hooks/device/useDevice'

import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { type DevicesApiResponse } from '../../../modules/shared/domain/types/responseTypes'

import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { SpinnerSKCircle } from '../../components/Loading/spinner-sk-circle'
import { TypeOfSiteId } from '../../../modules/location/typeofsites/domain/typeOfSiteId'
import TableSkeleton from '../../components/skeleton/TableSkeleton'
import { MainFallback } from '../../components/skeleton/MainFallback'

const HeaderInput = lazy(async () => import('../../components/HeaderInput').then(m => ({ default: m.HeaderInput })))
const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/PageTitle'))
const Table = lazy(async () => import('../../components/TableComponent/Table'))
const TableHeader = lazy(async () => import('../../components/TableComponent/TableHeader'))
const TableRow = lazy(async () => import('../../components/TableComponent/TableRow'))
const TableBody = lazy(async () => import('../../components/TableComponent/TableBody'))
const TableHead = lazy(async () => import('../../components/TableComponent/TableHead'))
const TableCell = lazy(async () => import('../../components/TableComponent/TableCell'))
const TableCellEditDeleteIcon = lazy(async () => import('../../components/TableComponent/TableCellEditDeleteIcon'))
const Button = lazy(async () => await import('../../components/button/button'))
const StatusComboBox = lazy(async () => await import('../../components/combo_box/StatusComboBox'))
const ActivoInput = lazy(async () => await import('../../components/text-inputs/ActivoInput'))
const SerialInput = lazy(async () => await import('../../components/text-inputs/SerialInput'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const LocationComboBox = lazy(async () => await import('../../components/combo_box/LocationComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))

export default function AlmacenPage() {
  const tableRef = useRef(null)
  const { devices, loading, addFilter, cleanFilters } = useDevice({
    filters: [{
      field: 'typeOfSiteId',
      operator: Operator.EQUAL,
      value: TypeOfSiteId.SitesOptions.ALMACEN
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
        field: 'typeOfSiteId',
        operator: Operator.EQUAL,
        value: TypeOfSiteId.SitesOptions.ALMACEN
      }]
    })
  }

  return (
    <Suspense fallback={<MainFallback />}>
      <Main>
        <Suspense>
          <PageTitle title='Inventario de Equipos en el almacén' />
        </Suspense>
        <Suspense>
          <HeaderInput>
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
            <Suspense>
              <StatusComboBox
                value={inputData.statusId}
                onChange={handleChange}
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
                typeOfSiteId={TypeOfSiteId.SitesOptions.ALMACEN} // Modificarlo para que no sea un magic string
                // statusId={StatusId.StatusOptions.INUSE}
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
              <Button
                type='button'
                actionType='SAVE'
                text='Export Excel'
                handle={() => { import('../../utils/DownloadTableExcel').then(m => m.exportToExcel(tableRef)) }}
              />
            </Suspense>
          </HeaderInput>
        </Suspense>
        {loading && <SpinnerSKCircle />}
        {(!loading && devices.length === 0) && <p>No hay resultados</p>}
        {(!loading && devices.length > 0) && <Suspense fallback={<TableSkeleton />}>
          <Table ref={tableRef} className=''>
            <TableHeader>
              <TableRow>
                <TableHead name='Acciones' />
                <TableHead name='Categoria' />
                <TableHead name='Serial' />
                <TableHead name='Activo' />
                <TableHead name='Status' />
                <TableHead name='Marca' />
                <TableHead name='Modelo' />
                <TableHead name='Ubicación' />
                <TableHead name='Observaciones' />
                <TableHead name='Procesador' />
                <TableHead name='Memoria Ram Total' />
                <TableHead name='Memoria Ram Modulos' />
                <TableHead name='Tipo' />
                <TableHead name='Disco Duro' />
                <TableHead name='Tipo' />
                <TableHead name='Estado de Salud' />
              </TableRow>
            </TableHeader>
            <TableBody>
              {(devices as unknown as DevicesApiResponse[]).map((device) => (
                <TableRow key={device.id}>
                  <TableCellEditDeleteIcon state={device} url={`/device/edit/${device.id}`} />
                  <TableCell value={device?.category?.name} />
                  <TableCell value={device?.serial ?? 'Sin Serial'} />
                  <TableCell value={device?.activo ?? 'Sin Activo'} />
                  <TableCell value={device?.status?.name} />
                  <TableCell value={device?.brand?.name} />
                  <TableCell value={device?.model?.name} />
                  <TableCell value={device?.location.name} />
                  <TableCell value={device?.observation} />
                  <TableCell value={device?.computer ? `${device?.computer?.processor?.productCollection} ${device?.computer?.processor?.numberModel}` : ''} />
                  <TableCell value={device?.computer ? `${device?.computer?.memoryRamCapacity} Gb` : ''} />
                  <TableCell value={device?.computer ? device?.computer?.memoryRam.map(mem => mem).join(' / ') : ''} />
                  <TableCell value={device?.model?.modelComputer ? device?.model?.modelComputer.memoryRamType?.name : device?.model?.modelLaptop ? device?.model?.modelLaptop?.memoryRamType?.name : ''} />
                  {
                    device?.hardDrive ?
                      <>
                        <TableCell value={device?.hardDrive ? `${device?.hardDrive?.hardDriveCapacity?.name} GB` : ''} />
                        <TableCell value={device?.hardDrive?.hardDriveType?.name} />
                      </>

                      : device?.computer ?
                        <>
                          <TableCell value={device?.computer ? `${device?.computer?.hardDriveCapacity?.name} Gb` : 'Sin Disco'} />
                          <TableCell value={device?.computer?.hardDriveType?.name ?? ''} />
                        </>

                        :
                        <>
                          <TableCell value='' />
                          <TableCell value='' />
                        </>

                  }
                  <TableCell value={device?.hardDrive?.health} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Suspense>}
      </Main>
    </Suspense>
  )
}
