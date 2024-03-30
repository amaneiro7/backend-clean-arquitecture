export type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
export type OnChange = (name: string, value: string, operator?: Operator) => void
