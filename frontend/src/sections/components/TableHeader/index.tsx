const TableHeader = ({ headerTitle }: { headerTitle: string[] }) => {
  return (
    <thead className='sticky z-50'>
      <tr className='rounded-2xl bg-slate-300 [&>th]:p-3 [&>th]:pl-2 [&>th]:text-xs [&>th]:w-fit [&>th]:whitespace-nowrap [&>th]:capitalize text-center'>
        <th className=' bg-slate-300'>Acciones</th>
        {headerTitle.map((title, index) => (
            <th
                key={index}
                className={`${index === 0 ? ' bg-slate-300' : ''}`}
            >
                {title}
            </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
