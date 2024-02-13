const TableHeader = ({ headerTitle }: { headerTitle: string[] }) => {
  return (
    <thead className='sticky'>
      <tr className='rounded-2xl bg-slate-300 [&>th]:p-3 [&>th]:pl-2 [&>th]:text-sm [&>th]:w-fit [&>th]:whitespace-nowrap [&>th]:capitalize text-center'>
        {headerTitle.map((title, index) => (
            <th
                key={index}
                className={`${index === 0 ? 'z-10 sticky top-0 left-0 bg-slate-300' : ''}`}
            >
                {title}
            </th>
        ))}
        <th className='sticky z-10 top-0 right-0 bg-slate-300'>Acciones</th>
      </tr>
    </thead>
  )
}

export default TableHeader
