import { TilesInvisible } from "./TilesInvisible";
import { TilesVisible } from "./TilesVisible";

interface Props {
    children: Array<React.ReactElement<typeof TilesInvisible | typeof TilesVisible>>
}

export function TilesBox({children}: Props) {
  return (
    <div className="overflow-hidden odd:text-white even:text-black group hover:before:-top-3/4 before:will-change-transform before:origin-center before:-rotate-[25deg] before:transition-all before:duration-500 before:ease-in-out before:absolute before:top-[200%] before:-left-3/4 before:w-[250%] before:block before:h-[220%] before:bg-primary relative w-full min-h72 h-72">
      <img
        className="bg-cover w-full h-full max-w-full align-middle b-0"
        src="https://d3q4nr72nuserl.cloudfront.net/images/default-source/home-tiles/bnc-img-tls-accounts.jpg?sfvrsn=f7574b2b_0"
        alt=""
      />
      {children}
    </div>
  );
}
