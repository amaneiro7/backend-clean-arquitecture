import { Suspense } from "react";
import Main from "../../components/Main";
import { InfoBox } from "../../components/info-box/InfoBox";
import { useAppContext } from "../../Context/AppContext";
import { useLocation } from "../../Device/location/useLocation";
import { InfoBoxTitle } from "../../components/info-box/InfoBoxTitle";
import { InfoBoxText } from "../../components/info-box/InfoBoxText";
import { LocationApiResponse } from "../../../modules/shared/domain/types/responseTypes";

export default function ListadoSitios() {
    const { repository } = useAppContext()
    const { locations } = useLocation(repository)
    return (
        <Suspense>
            <Main>
                {
                    (locations as LocationApiResponse[]).map(({id, name, subnet, site}) => (
                        <InfoBox key={id}>
                            <InfoBoxTitle title={name}/>
                            <InfoBoxText desc="Dirección" text={site.address} />
                            <InfoBoxText desc="Subnet" text={subnet} />
                        </InfoBox>
                    ))
                }
            </Main>
        </Suspense>
    )
}
