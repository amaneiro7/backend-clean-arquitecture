import { lazy, Suspense, useMemo } from "react";

import { StatusId } from "../../../modules/devices/devices/status/domain/StatusId";
import { OnHandleChange } from "../../../modules/shared/domain/types/types";
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives";
import { useAppContext } from "../../Context/AppContext";
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators";

import { LocationId } from "../../../modules/location/locations/domain/locationId";
import { useLocation } from "../../Device/location/useLocation";
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading";

interface Props {
    value?: Primitives<LocationId>    
    typeOfSiteId?: Primitives<LocationId>
    statusId?: Primitives<StatusId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
  }

  const ComboBox = lazy(async() => import("./combo_box"));
//   const BrandDialog = lazy(async () => import("../Dialog/BrandDialog"));

export default function LocationComboBox ({ value, statusId, typeOfSiteId, onChange, type = 'search' }: Props) {
    const { repository } = useAppContext()
    const { locations, loading } = useLocation(repository)          
    // const [open, toggleOpen] = useState(false)
    // const [dialogValue, setDialogValue] = useState<BrandPrimitives>({name: ''});

    const initialValue = useMemo(() => {
        return locations.find(location => location.id === value)
    }, [locations, value])

    const filterLocation = useMemo(() => {
        return locations.filter(location => {
          const typeOfSite = location.typeOfSiteId === typeOfSiteId || (typeOfSiteId === undefined || typeOfSiteId === '')
          const status = statusId === undefined ? true : statusId === StatusId.StatusOptions.INUSE ? (location.typeOfSiteId === '1' || location.typeOfSiteId === '2') : location.typeOfSiteId === '3'
          return typeOfSite && status
        })
      }, [locations, typeOfSiteId, statusId])
  
    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <ComboBox
                id='locationId'
                initialValue={initialValue}
                label="Ubicación"
                name='locationId'
                type={type}
                onChange={(_, newValue) => {
                    // if (typeof newValue === 'string') {
                    //     timeout to avoid instant validation of the dialog's form.
                    //     setTimeout(() => {
                    //         toggleOpen(true)
                    //         setDialogValue({
                    //             name: newValue
                    //         })
                    //     })
                    // } else if (newValue && newValue.inputValue) {
                    //     toggleOpen(true);
                    //     setDialogValue({
                    //         name: newValue.inputValue
                    //     });
                    // } else {
                    //     onChange('brandId', newValue ? newValue.id : '', Operator.EQUAL)
                    // }
                    onChange('locationId', newValue ? newValue.id : '', Operator.EQUAL)
                }}
                options={filterLocation}
                isDisabled={false}
                isRequired={type === 'form'}                
                loading={loading}                
            >
            {/* {type === 'form' && (
                <Suspense>
                    <BrandDialog  dialogValue={dialogValue} open={open} toggleOpen={toggleOpen}/>
                </Suspense>
            )} */}
            </ComboBox>
        </Suspense>
    )
}