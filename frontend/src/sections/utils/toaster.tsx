import { Toaster, toast } from 'sonner'

export const ToasterComponent = () => {
  return (
    <Toaster
        closeButton
        expand={false}
        position='bottom-right'
        richColors
    />
  )
}
export const toastMessage = ({ message, type }: { message: string, type: 'success' | 'error' | 'loading' }) => {
  return toast[type](message)
}
