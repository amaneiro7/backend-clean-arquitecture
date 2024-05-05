import logoImg from '../../assets/bnclogo.png'
export default function Logo () {
  return (
        <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            SoporteTecnico
            <img className="w-28" src={logoImg} alt="logo" />
        </h1>
  )
}
