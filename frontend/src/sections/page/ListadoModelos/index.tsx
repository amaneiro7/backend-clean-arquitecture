import { lazy, Suspense, useCallback, useMemo, useRef } from "react"
import { useNavigate } from "react-router-dom"
import debounce from "just-debounce-it"

import { type SearchByCriteriaQuery } from "../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery"
import { type ModelApiresponse } from "../../../modules/shared/domain/types/responseTypes"
import { useInputsData } from "./useInputData"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { useModelByCriteria } from "../../Hooks/model/useModelByCriteria"
import { InputSkeletonLoading } from "../../components/skeleton/inputSkeletonLoading"
import { SpinnerSKCircle } from "../../components/Loading/spinner-sk-circle"
import { MainFallback } from "../../components/skeleton/MainFallback"
import TableSkeleton from "../../components/skeleton/TableSkeleton"
import { ModelComputer } from "../../../modules/devices/model/ModelCharacteristics/modelComputer/ModelComputer"
import { ModelLaptop } from "../../../modules/devices/model/ModelCharacteristics/modelLaptop/ModelLaptop"
import { ModelPrinter } from "../../../modules/devices/model/ModelCharacteristics/modelPrinter/ModelPrinter"
import { ModelMonitor } from "../../../modules/devices/model/ModelCharacteristics/modelMonitor/ModelMonitor"
import { ModelKeyboard } from "../../../modules/devices/model/ModelCharacteristics/modelKeyboard/ModelKeyboard"


const HeaderInput = lazy(async () => import('../../components/HeaderInput').then(m => ({ default: m.HeaderInput })))
const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/PageTitle'))
const Button = lazy(async () => import("../../components/button"))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))
const Table = lazy(async () => import('../../components/TableComponent/Table'))
const TableHeader = lazy(async () => import('../../components/TableComponent/TableHeader'))
const TableRow = lazy(async () => import('../../components/TableComponent/TableRow'))
const TableBody = lazy(async () => import('../../components/TableComponent/TableBody'))
const TableHead = lazy(async () => import('../../components/TableComponent/TableHead'))
const TableCell = lazy(async () => import('../../components/TableComponent/TableCell'))
const TableCellEditDeleteIcon = lazy(async () => import('../../components/TableComponent/TableCellEditDeleteIcon'))

export default function ListadoModelos() {
    const tableRef = useRef(null)
    const { models, loading, addFilter, cleanFilters } = useModelByCriteria()
    const navigate = useNavigate()
    const { inputData, updateInputData, clearInputs } = useInputsData()

    console.log(models)


    const isComputer = useMemo(() => {
        return ModelComputer.isComputerCategory({ categoryId: inputData.categoryId })
    }, [inputData.categoryId])
    const isLaptop = useMemo(() => {
        return ModelLaptop.isLaptopCategory({ categoryId: inputData.categoryId })
    }, [inputData.categoryId])
    const isMonitor = useMemo(() => {
        return ModelMonitor.isMonitorCategory({ categoryId: inputData.categoryId })
    }, [inputData.categoryId])
    const isPrinter = useMemo(() => {
        return ModelPrinter.isPrinterCategory({ categoryId: inputData.categoryId })
    }, [inputData.categoryId])
    const isKeyboard = useMemo(() => {
        return ModelKeyboard.isKeyboardCategory({ categoryId: inputData.categoryId })
    }, [inputData.categoryId])

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
                            />
                        </Suspense>
                        <Suspense fallback={<InputSkeletonLoading />}>
                            <BrandComboBox
                                categoryId={inputData.categoryId}
                                value={inputData.brandId}
                                onChange={handleChange}
                            />
                        </Suspense>
                        <Suspense fallback={<InputSkeletonLoading />}>
                            <ModelComboBox
                                name='id'
                                brandId={inputData.brandId}
                                categoryId={inputData.categoryId}
                                value={inputData.id}
                                onChange={handleChange}
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
                        <Suspense>
                            <Button
                                type='button'
                                actionType='SAVE'
                                text='Export Excel'
                                handle={() => { import('../../components/button/DownloadTableExcel').then(m => m.exportToExcel(tableRef)) }}
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
                                {!(isMonitor || isPrinter || isKeyboard) && <TableHead name='Tipo de Memoria' />}
                                {!(isMonitor || isPrinter || isKeyboard) && <TableHead name='Cantidad de Ranuras' />}
                                {!(isPrinter || isKeyboard) && <TableHead name='Puerto VGA' />}
                                {!(isPrinter || isKeyboard) && <TableHead name='Puerto DVI' />}
                                {!(isPrinter || isKeyboard) && <TableHead name='Puerto HDMI' />}
                                {!(isMonitor || isPrinter || isKeyboard) && <TableHead name='Adaptador Bluetooth' />}
                                {!(isMonitor || isPrinter || isKeyboard) && <TableHead name='Adaptador Wifi' />}
                                {!(isComputer || isMonitor || isPrinter || isKeyboard) && <TableHead name='Modelo de bateria' />}
                                {!(isComputer || isLaptop || isPrinter || isKeyboard) && <TableHead name='Tamaño de Pantalla' />}
                                {!(isComputer || isLaptop || isMonitor || isKeyboard) && <TableHead name='Modelo de cartucho' />}
                                {!(isComputer || isLaptop || isMonitor || isPrinter) && <TableHead name='Tipo de entrada' />}
                                {!(isComputer || isLaptop || isMonitor || isPrinter) && <TableHead name='Lector de huella' />}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(models as unknown as ModelApiresponse[]).map((model) => (
                                <TableRow key={model?.id}>
                                    <TableCellEditDeleteIcon state={model} url={`/model/edit/${model.id}`} />
                                    <TableCell value={model?.category?.name} />
                                    <TableCell value={model?.brand?.name} />
                                    <TableCell value={model?.name} />
                                    {!(isMonitor || isPrinter || isKeyboard) && <TableCell value={model?.modelComputer?.memoryRamType?.name || model?.modelLaptop?.memoryRamType?.name} />}
                                    {!(isMonitor || isPrinter || isKeyboard) && <TableCell value={model?.modelComputer?.memoryRamSlotQuantity || model?.modelLaptop?.memoryRamSlotQuantity} />}
                                    {!(isPrinter || isKeyboard) && <TableCell value={(model?.modelComputer || model?.modelLaptop || model?.modelMonitor) ? (model?.modelComputer?.hasVGA || model?.modelLaptop?.hasVGA || model?.modelMonitor?.hasVGA ? 'Si' : 'No') : ''} />}
                                    {!(isPrinter || isKeyboard) && <TableCell value={(model?.modelComputer || model?.modelLaptop || model?.modelMonitor) ? (model?.modelComputer?.hasDVI || model?.modelLaptop?.hasDVI || model?.modelMonitor?.hasDVI ? 'Si' : 'No') : ''} />}
                                    {!(isPrinter || isKeyboard) && <TableCell value={(model?.modelComputer || model?.modelLaptop || model?.modelMonitor) ? (model?.modelComputer?.hasHDMI || model?.modelLaptop?.hasHDMI || model?.modelMonitor?.hasHDMI ? 'Si' : 'No') : ''} />}
                                    {!(isMonitor || isPrinter || isKeyboard) && <TableCell value={(model?.modelComputer || model?.modelLaptop) ? (model?.modelComputer?.hasBluetooth || model?.modelLaptop?.hasBluetooth ? 'Si' : 'No') : ''} />}
                                    {!(isMonitor || isPrinter || isKeyboard) && <TableCell value={(model?.modelComputer || model?.modelLaptop) ? (model?.modelComputer?.hasWifiAdapter || model?.modelLaptop?.hasWifiAdapter ? 'Si' : 'No') : ''} />}
                                    {!(isComputer || isMonitor || isPrinter || isKeyboard) && <TableCell value={model?.modelLaptop?.batteryModel} />}
                                    {!(isComputer || isLaptop || isPrinter || isKeyboard) && <TableCell value={model?.modelMonitor ? `${model?.modelMonitor.screenSize} pulgadas` : ''} />}
                                    {!(isComputer || isLaptop || isMonitor || isKeyboard) && <TableCell value={model?.modelPrinter?.cartridgeModel} />}
                                    {!(isComputer || isLaptop || isMonitor || isPrinter) && <TableCell value={model?.modelKeyboard?.inputType?.name} />}
                                    {!(isComputer || isLaptop || isMonitor || isPrinter) && <TableCell value={model?.modelKeyboard ? (model?.modelKeyboard?.hasFingerPrintReader ? 'Si' : 'No') : ''} />}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Suspense>}
            </Main>
        </Suspense>
    )
}