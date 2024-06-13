import { FixedSizeList as List } from 'react-window'

interface Props {
    itemCount: number
}

function ListWrapper ({children, itemCount}: React.PropsWithChildren<Props>) {
    return (
      <List
        height={400}
        itemCount={itemCount}
        itemSize={46}
        width='100%'
        layout='vertical'
      >
        {children}
      </List>

    )
}

export function Row ({index, style}) {
    return (
      <div>
        {children}
      </div>
    )
}