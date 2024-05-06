import { lazy } from 'react'

const Link = lazy(async () => import('../mui/Link').then(m => ({ default: m.Link })))
const Typography = lazy(async () => import('../mui/Typography').then(m => ({ default: m.Typography })))

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
