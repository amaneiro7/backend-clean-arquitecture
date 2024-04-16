import { Suspense, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { useInputsData } from './useInputData'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import Main from '../../components/Main'
import PageTitle from '../../components/PageTitle'
import debounce from 'just-debounce-it'
import Button from '../../ui/button'
import Table from '../../components/TableComponent/Table'
import TableHeader from '../../components/TableComponent/TableHeader'
import TableRow from '../../components/TableComponent/TableRow'
import TableBody from '../../components/TableComponent/TableBody'
import TableCellEditDeleteIcon from '../../components/TableComponent/TableCellEditDeleteIcon'
import TableCell from '../../components/TableComponent/TableCell'
import TableHead from '../../components/TableComponent/TableHead'
import EmployeeNameInput from '../../Device/employee/components/NameInput'
import EmployeeLastNameInput from '../../Device/employee/components/LastNameInput'
import EmployeeUserNameInput from '../../Device/employee/components/UserNameInput'
import EmployeeEmailInput from '../../Device/employee/components/EmployeeEmail'
import LocationSelect from '../../Device/location/LocationSelect'
import CoordinacionSelect from '../../Device/area/Coordinacion/CoordinacionSelect'
import VicepresidenciaSelect from '../../Device/area/vicepresidencia/VicepresidenciaSelect'
import VicepresidenciaEjecutivaSelect from '../../Device/area/vicepresidenciaEjecutivaId/VicepresidenciaEjecutivaSelect'
import CargoSelect from '../../Device/cargo/CargoSelect'
import GerenciaSelect from '../../Device/area/Gerencia/GerenciaSelect'
import { type EmployeeMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { useEmployee } from '../../Device/employee/useEmployee'

export default function EmployeeDirectorio () {
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

  const handleClear = () => {
    clearInputs()
    cleanFilters({
      filters: []
    })
  }

  useEffect(() => {
    cleanFilters({ filters: [] })
  }, [])
  return (
    <Main>
        <PageTitle title="Directorio" />
        <Suspense>
            <Button
                type='button'
                text='Agregar un nuevo usuario'
                actionType='ACTION'
                handle={() => { navigate('/employee/add') }}
            />
        </Suspense>
        <header className="grid grid-cols-[repeat(auto-fit,_250px)] gap-5 place-content-center">
            <Suspense>
                <EmployeeUserNameInput
                    value={inputData.userName}
                    name={inputData.name}
                    lastName={inputData.lastName}
                    onChange={handleChange}
                />
            </Suspense>
            <Suspense>
                <EmployeeNameInput
                    value={inputData.name}
                    onChange={handleChange}
                />
            </Suspense>
            <Suspense>
                <EmployeeLastNameInput
                    value={inputData.lastName}
                    onChange={handleChange}
                />
            </Suspense>
            <Suspense>
                <LocationSelect
                    value={inputData.locationId}
                    onChange={handleChange}
                />
            </Suspense>
            <Suspense>
                <EmployeeEmailInput
                    value={inputData.email}
                    onChange={handleChange}
                />
            </Suspense>
            <Suspense>
                <CargoSelect
                    value={inputData.cargoId}
                    onChange={handleChange}
                />
            </Suspense>
            <Suspense>
                <VicepresidenciaEjecutivaSelect
                    value={inputData.vicepresidenciaEjecutivaId}
                    onChange={handleChange}
                />
            </Suspense>
            <Suspense>
                <VicepresidenciaSelect
                    value={inputData.vicepresidenciaId}
                    vicepresidenciaEjecutivaId={inputData.vicepresidenciaEjecutivaId}
                    onChange={handleChange}
                />
            </Suspense>
            <Suspense>
                <GerenciaSelect
                    value={inputData.gerenciaId}
                    vicepresidenciaId={inputData.vicepresidenciaId}
                    onChange={handleChange}
                />
            </Suspense>
            <Suspense>
                <CoordinacionSelect
                    value={inputData.coordinacionId}
                    gerenciaId={inputData.gerenciaId}
                    onChange={handleChange}
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
                        <TableHead name='Nombre' />
                        <TableHead name='Apellido' />
                        <TableHead name='Cedula' />
                        <TableHead name='Correo' />
                        <TableHead name='Extension' />
                        <TableHead name='Número de telefono' />
                        <TableHead name='Ubicación' />
                        <TableHead name='Cargo' />
                        <TableHead name='VPE' />
                        <TableHead name='VP' />
                        <TableHead name='Gerencia' />
                        <TableHead name='Coordinacion' />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(employees as unknown as EmployeeMappedApiResponse[]).map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCellEditDeleteIcon state={employee} url={`/employee/edit/${employee.id}`} />
                            <TableCell value={employee.userName} />
                            <TableCell value={employee.name} />
                            <TableCell value={employee.lastName} />
                            <TableCell value={employee.cedula} />
                            <TableCell value={employee.email} />
                            <TableCell value={employee.extension} />
                            <TableCell value={employee.phoneNumber} />
                            <TableCell value={employee.locationName} />
                            <TableCell value={employee.cargoName} />
                            <TableCell value={employee.vicepresidenciaEjecutivaName} />
                            <TableCell value={employee.vicepresidenciaName} />
                            <TableCell value={employee.gerenciaName} />
                            <TableCell value={employee.coordinacionName} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Suspense>}
    </Main>

  )
}
