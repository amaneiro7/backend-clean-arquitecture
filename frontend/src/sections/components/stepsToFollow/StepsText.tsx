import { CheckIcon } from "../icon/CheckIcon";
import { EditIcon } from "../icon/EditIcon";
import { Paragraph } from "../Typography/Paragraph";

interface Props {
    requisito?: 'Obligatorio' | 'Opcional'
}

export function StepsText ({ requisito }: Props) {
    return (
      <div className='flex gap-3'>
        <CheckIcon width={24} className={`${requisito === 'Opcional' ? 'bg-primary-400' : 'bg-cancel'} aspect-square text-white rounded-full p-1`} />
        <p>
          <Paragraph color='gray' variant='span' className='font-semibold' text={`${requisito}. `}  />
          <Paragraph color='gray' variant='span' text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima tempora velit voluptatem placeat quisquam odio vitae et rem ut neque, necessitatibus ex, aliquid esse unde eum quae, illo pariatur. Vero. ' />
          <Paragraph
            color='white' variant='span' text='Editar' backgroundColor='blue' icon={
              <EditIcon />
          }
          />
        </p>
        
      </div>
    )
}