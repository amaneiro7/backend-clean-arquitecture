import { useAppContext } from "../../Context/AppContext";
import { useDevice } from "../../Device/device/useDevice";

import Main from "../../components/Main";
import PageTitle from "../../components/PageTitle";
import { FilterManager } from "../../components/Filter/FilterManager";

export default function FilterByDevice() {
    const {repository} = useAppContext()
    const { devices, addFilter } = useDevice(repository)
    console.log(devices)
    return(
        <Main>
            <PageTitle title="Filtrar por Dispositivo"/>
            <FilterManager handleFilter={addFilter} />
        </Main>
    )
}