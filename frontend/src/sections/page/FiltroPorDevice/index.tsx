import { useState } from "react";
import { FilterManager } from "../../components/Filter/FilterManager";
import Main from "../../components/Main";
import PageTitle from "../../components/PageTitle";

export default function FilterByDevice() {
    const [devices, setDevices] = useState([]);
    return(
        <Main>
            <PageTitle title="Filtrar por Dispositivo"/>
            <FilterManager  />
        </Main>
    )
}