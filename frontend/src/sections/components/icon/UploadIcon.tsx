import Upload from './upload.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function UploadIcon({...props}:Props) {
  return (
    <i>
      <Upload {...props} />
    </i>
  )
}
