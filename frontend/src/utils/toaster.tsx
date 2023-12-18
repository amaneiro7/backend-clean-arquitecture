import { Toaster, toast } from 'sonner'

export const ToasterComponent = () => {
  return (
    <Toaster
        closeButton
        expand={true}
        position='bottom-right'
        richColors
    />
  )
}
export const toastMessage = ({ message }: { message: string }) => {
  const promise = async () => await new Promise((resolve) => setTimeout(resolve, 2000))
  return toast.promise(promise, {
    loading: 'Loading...',
    success: () => {
      return `${message}`
    },
    error: 'Error'
  })
}
