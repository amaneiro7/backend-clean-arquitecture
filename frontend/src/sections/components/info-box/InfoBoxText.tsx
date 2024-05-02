export function InfoBoxText({ desc, text }: { text: string, desc?: string }) {
    return (
        <p className="font-sans font-normal text-slate-600 text-left">
            <b>{`${desc}: `}</b>
            {text}
        </p>
    )
}