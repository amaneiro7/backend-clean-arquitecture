export function InfoBoxText({ desc, text, className }: { text: string, desc?: string, className?: string }) {
    return (
      <p className={`font-sans font-normal text-slate-600 text-left ${className}`}>
        <b>{`${desc}: `}</b>
        {text}
      </p>
    )
}