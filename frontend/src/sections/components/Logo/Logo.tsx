import { lazy } from "react"
import './Logo.css'

const LazyLogoImage = lazy(async () => import("../lazyImages/LazyLogoImage").then((m) => ({ default: m.LazyLogoImage })))
export default function Logo() {
  return (
    <div className='Logo flex gap-2 divide-x-2 divide-secondary-900 items-center'>
      <LazyLogoImage className='max-w-11 bg-contain mdlg:w-24 lg:w-28 clear-none' />
      <h1
        className='pl-2 hidden mdlg:flex flex-col leaing-8 font-semibold text-secondary dark:text-white'         
      >
        Soporte Tecnico
        <span className='text-secondary-950/80 leadig-5'>Aplicacion de Inventario
        </span>
      </h1>
    </div>
  )
}
