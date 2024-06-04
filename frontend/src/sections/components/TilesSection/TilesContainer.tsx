import { Link } from "react-router-dom";

export function TilesContainer() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <div className="overflow-hidden group hover:before:-top-3/4 before:will-change-transform before:origin-center before:-rotate-45 before:transition-all before:duration-500 before:ease-in-out before:absolute before:-left-1/2 before:w-full before:block before:h-full before:bg-primary  relative w-full min-h72 h-72">
        <img
          className="bg-cover w-full h-full max-w-full align-middle b-0"
          src="https://d3q4nr72nuserl.cloudfront.net/images/default-source/home-tiles/bnc-img-tls-accounts.jpg?sfvrsn=f7574b2b_0"
          alt=""
        />
        {/* Visible Text */}
        <div className="absolute top-0 left-0 w-full h-full flex text-white text-left group-hover:opacity-0 group-hover:pointer-events-none p-4 flex-wrap content-center transition-all duration-500 ease-in-out">
          <h2 className="w-full m-0 text-3xl font-medium">Cuentas</h2>
          <p style={{ textShadow: "0 1px 1px black" }} className="text-xs leading-6 w-1/2 max-w-64 drop-shadow-md">
            Opciones para mantener y movilizar tus fondos, a través de instrumentos de pago y la banca digital.
          </p>
        </div>
        {/* Hidden Text */}
        <div className="opacity-0 absolute top-0 left-0 w-full h-full flex text-white text-left group-hover:opacity-100 group-hover:pointer-events-auto p-4 flex-wrap content-center transition-all duration-500 ease-in-out">
          <h4 className="w-full p-2 text-lg mx-2 font-medium">
            <div className="flex flex-wrap text-white">
              <ul className="pl-2 mt-0 mb-2">
                <li className="list-item pb-3">
                  <Link style={{ textShadow: '0 1px 2px #00000099' }} className=" font-light" to="/productos-y-servicios/cuentas#BS">Cuentas en Moneda Nacional</Link>
                </li>
              </ul>
            </div>
          </h4>
        </div>
      </div>
    </div>
  );
}
