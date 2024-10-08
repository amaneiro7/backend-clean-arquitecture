interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string
}

export function ReadOnlyInputBox ({ label, ...props }: Props) {
    return (
      <div className='relative inline-flex flex-col align-top h-6 min-h-[40px] w-full'>
        <label
          style={{
                    transformOrigin: 'top left',
                    transform: 'translate(14px, -9px) scale(0.75)',
                    transition: 'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms'
                }}
          className='absolute bg-white px-1 font-body font-normal text-base tracking-tight p-0 whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(133%-32px)] top-0 left-0 select-none pointer-events-auto text-black/60'
        >{`${label} *`}
        </label>
        <div className='w-full h-14 p-1 pr-2 border rounded-md outline-none border-black/20'>
          <input
            className='py-1 pr-1 pl-2 w-0 min-w-full flex-1 text-ellipsis focus-visible:outline-none text-black/60'
            readOnly                    
            tabIndex={-1}
            {...props}
          />
        </div>
      </div>
    )
}