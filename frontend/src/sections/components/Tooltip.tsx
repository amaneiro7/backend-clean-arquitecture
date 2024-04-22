export function Tooltip ({ text }: { text: string | number }) {
  return (
      <div className="w-full group inline-block relative">
        <p className="w-full text-left align-middle whitespace-nowrap text-ellipsis overflow-x-hidden overflow-y-visible break-words">{text}
        </p>
        <span className="invisible bg-primary drop-shadow shadow-slate-50 text-white rounded-md px-1 py-2 absolute bottom-full left-1/2 -ml-16 opacity-0 transition-opacity text-center after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-4 after:border-solid after:border-t-primary after:border-l-transparent after:border-r-transparent after:border-b-transparent group-hover:visible group-hover:opacity-100">
          {text}
        </span>
      </div>
  )
}
