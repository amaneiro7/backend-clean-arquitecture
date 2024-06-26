export function InfoBox({ children }: React.PropsWithChildren) {
    return (
      <div className='w-fit max-w-lg bg-white rounded-lg drop-shadow-md shadow-lg p-4'>
        <div>
          {children}
        </div>
        <div />
      </div>
    )
}