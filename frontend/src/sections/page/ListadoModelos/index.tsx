import { lazy, Suspense, useCallback, useRef } from "react"
import { useNavigate } from "react-router-dom"
import debounce from "just-debounce-it"

import { useInputsData } from "./useInputData"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { SearchByCriteriaQuery } from "../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery"
import { InputSkeletonLoading } from "../../components/skeleton/inputSkeletonLoading"
import { SpinnerSKCircle } from "../../components/Loading/spinner-sk-circle"
import { MainFallback } from "../../components/skeleton/MainFallback"
import TableSkeleton from "../../components/skeleton/TableSkeleton"
import { useModelByCriteria } from "../../Hooks/model/useModelByCriteria"
import { ModelApiresponse } from "../../../modules/shared/domain/types/responseTypes"


const Button = lazy(async () => import("../../components/button"))
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
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))

export default function ListadoModelos() {
    const tableRef = useRef(null)
    const navigate = useNavigate()
    const { models, loading, addFilter, cleanFilters } = useModelByCriteria()
    const { inputData, updateInputData, clearInputs } = useInputsData()

    const debounceGetLocations = useCallback(
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
        debounceGetLocations({ filters })
    }

    const handleClear = () => {
        clearInputs()
        cleanFilters({
            filters: []
        })
    }
    return (
        <Suspense fallback={<MainFallback />}>
            <Main>
                <Suspense>
                    <PageTitle title='Listado de Modelos' />
                </Suspense>
                <Suspense>
                    <HeaderInput>
                        <Suspense fallback={<InputSkeletonLoading />}>
                            <CategoryComboBox
                                value={inputData.categoryId}
                                onChange={handleChange}
                                type='search'
                            />
                        </Suspense>
                        <Suspense fallback={<InputSkeletonLoading />}>
                            <BrandComboBox
                                categoryId={inputData.categoryId}
                                value={inputData.brandId}
                                onChange={handleChange}
                                type='search'
                            />
                        </Suspense>
                        <Suspense fallback={<InputSkeletonLoading />}>
                            <ModelComboBox
                                name='name'
                                brandId={inputData.brandId}
                                categoryId={inputData.categoryId}
                                value={inputData.name}
                                onChange={handleChange}
                                type='search'
                            />
                        </Suspense>
                        <Suspense fallback={<InputSkeletonLoading />}>
                            <Button
                                type='button'
                                text='Añadir'
                                actionType='ACTION'
                                handle={() => { navigate('/model/add') }}
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
                    </HeaderInput>
                </Suspense>
                {loading && <SpinnerSKCircle />}
                {(!loading && models.length === 0) && <p>No hay resultados</p>}
                {(!loading && models.length > 0) && <Suspense fallback={<TableSkeleton />}>
                    <Table ref={tableRef} className=''>
                        <TableHeader>
                            <TableRow>
                                <TableHead name='Acciones' />
                                <TableHead name='Categoria' />
                                <TableHead name='Marca' />
                                <TableHead name='Modelo' />
                                <TableHead name='Tipo de Memoria' />
                                <TableHead name='Cantidad de Ranuras' />
                                <TableHead name='Puerto VGA' />
                                <TableHead name='Puerto DVI' />
                                <TableHead name='Puerto HDMI' />
                                <TableHead name='Adaptador Bluetooth' />
                                <TableHead name='Adaptador Wifi' />
                                <TableHead name='Modelo de bateria' />
                                <TableHead name='Tamaño de Pantalla' />
                                <TableHead name='Modelo de cartucho' />
                                <TableHead name='Tipo de entrada' />
                                <TableHead name='Lector de huella' />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(models as unknown as ModelApiresponse[]).map((model) => (
                                <TableRow key={model?.id}>
                                    <TableCellEditDeleteIcon state={model} url={`/model/edit/${model.id}`} />
                                    <TableCell value={model?.category?.name} />
                                    <TableCell value={model?.brand?.name} />
                                    <TableCell value={model?.name} />
                                    <TableCell value={model?.modelComputer?.memoryRamType?.name || model?.modelLaptop?.memoryRamType?.name} />
                                    <TableCell value={model?.modelComputer?.memoryRamSlotQuantity || model?.modelLaptop?.memoryRamSlotQuantity} />
                                    <TableCell value={(model?.modelComputer || model?.modelLaptop || model?.modelMonitor) ? (model?.modelComputer?.hasVGA || model?.modelLaptop?.hasVGA || model?.modelMonitor?.hasVGA ? 'Si' : 'No' ) : ''} />
                                    <TableCell value={(model?.modelComputer || model?.modelLaptop || model?.modelMonitor) ? (model?.modelComputer?.hasDVI || model?.modelLaptop?.hasDVI || model?.modelMonitor?.hasDVI ? 'Si' : 'No' ) : ''} />
                                    <TableCell value={(model?.modelComputer || model?.modelLaptop || model?.modelMonitor) ? (model?.modelComputer?.hasHDMI || model?.modelLaptop?.hasHDMI || model?.modelMonitor?.hasHDMI ? 'Si' : 'No' ) : ''} />                                    
                                    <TableCell value={(model?.modelComputer || model?.modelLaptop) ? (model?.modelComputer?.hasBluetooth || model?.modelLaptop?.hasBluetooth ? 'Si' : 'No' ) : ''} />                                                                        
                                    <TableCell value={(model?.modelComputer || model?.modelLaptop) ? (model?.modelComputer?.hasWifiAdapter || model?.modelLaptop?.hasWifiAdapter ? 'Si' : 'No' ) : ''} />                                                                                                            
                                    <TableCell value={model?.modelLaptop?.batteryModel} />
                                    <TableCell value={model?.modelMonitor ? `${model?.modelMonitor.screenSize} pulgadas` : '' } />
                                    <TableCell value={model?.modelPrinter?.cartridgeModel} />
                                    <TableCell value={model?.modelkeyboard?.inputType?.name} />
                                    <TableCell value={model?.modelkeyboard ? (model?.modelkeyboard?.hasFingerPrinteReader ? 'Si' : 'No') : ''} />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Suspense>}
            </Main>
        </Suspense>
    )
}