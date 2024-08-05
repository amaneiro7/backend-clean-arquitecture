import PageTitle from '../Typography/PageTitle'
import Paragraph from '../Paragraph'

export default function SectionTitle ({ title, text }: { title: string, text: string }) {
  return (
    <div className='max-w-xl space-y-3'>
      <PageTitle title={title} />
      <Paragraph text={text} />
    </div>
  )
}
