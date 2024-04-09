import bannerImg from '../../../assets/banner.jpg'
export default function Banner () {
  return (
    <section className='relative w-full h-52 bg-secondary-900'>
        <img src={bannerImg} className="w-full h-full" alt="banner-img" />
        <h2
            style={{ textShadow: '0 1px 2px black' }}
            className='text-4xl font-bold text-white absolute bottom-2 pl-8 drop-shadow-md'
        >
            Aplicacion de Inventarios
        </h2>
    </section>
  )
}
