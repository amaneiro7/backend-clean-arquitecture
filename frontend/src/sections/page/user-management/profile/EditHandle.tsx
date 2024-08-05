import { LinkAsButton } from "../../../components/button/LinkAsButton";

export function EditHandle ({id}: {id: string}) {
    return (
      <LinkAsButton
        actionType='CLOSE'
        text='Editar'
        url={`/user-management/edit/${id}`}
      />
    )
}