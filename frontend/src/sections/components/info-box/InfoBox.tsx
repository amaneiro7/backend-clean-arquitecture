
export function InfoBox({children}: React.PropsWithChildren) {
    return (
        <div className="bg-white rounded-lg shadow-2xl p-4 mb-8">
            <div>
                {children}
            </div>
            <div></div>
        </div>
    )
}