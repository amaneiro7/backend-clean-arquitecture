import { Typography } from '../../mui/Typography'
import { Link } from '../../mui/Link'

export function Copyright (props: any) {
  return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          InventarioAPP
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  )
}
