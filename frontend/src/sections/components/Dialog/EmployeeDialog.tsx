import { lazy, Suspense, useEffect } from "react"
import { useGenericFormData } from "../../Hooks/useGenericFormData"
import { FormStatus, useEmployeeForm } from "../../Hooks/employee/useEmployeeForm"
import { EmployeePrimitives } from "../../../modules/employee/employee/domain/Employee"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"

interface Props {
  dialogValue: EmployeePrimitives
  open: boolean,
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
  createEmployee: (formData: EmployeePrimitives) => Promise<void>
}

const DialogAdd = lazy(async () => import("./dialog"))
const EmployeeUserNameInput = lazy(async () => import("../text-inputs/UserNameInput").then(m => ({ default: m.EmployeeUserNameInput })))

export default function EmployeeDialog({ createEmployee, dialogValue, open, toggleOpen }: Props) {
  const { formData, resetForm, updateForm } = useGenericFormData(dialogValue)
  const { formStatus, resetFormStatus, submitForm } = useEmployeeForm({ createEmployee })

  useEffect(() => {
    updateForm(dialogValue)
    return () => {
      resetForm()
    }
  }, [dialogValue])

  useEffect(() => {
    if (formStatus === FormStatus.Success) {
      resetFormStatus()
      resetForm()
      toggleOpen(false)
    }
    if (formStatus === FormStatus.Error) {
      resetFormStatus()
    }
  }, [formStatus])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    await submitForm(formData)
  }

  const handleChange = (name: string, value: string) => {
    updateForm({ [name]: value })
  }

  return (
    <Suspense>
      <DialogAdd
        title="Agregar un nuevo Usuario"
        contextText="¿No existe el usuario en la lista? Por favor, añada uno nuevo."
        open={open}
        toggleOpen={toggleOpen}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      >
        <Suspense fallback={<InputSkeletonLoading />}>
          <EmployeeUserNameInput
            value={formData.userName}
            type="dialog"
            onChange={handleChange}
          />
        </Suspense>
      </DialogAdd>
    </Suspense>
  )
}