import logoImg from '../../assets/bnclogo.png'
export default function Logo() {
  return (
    <div className='flex items-center justify-center'>
      <h1 className="hidden md:flex flex-col text-2xl font-semibold text-secondary dark:text-white">
        SoporteTecnico
        <span className='text-sm text-secondary-950/80'>Aplicacion de Inventario</span>
      </h1>
      <img className="max-w-none bg-contain w-28 h-11 clear-none" src={logoImg} alt="logo" />
    </div>

  )
}
