interface Props {
  title: string;
  desc?: string;
}
export function TilesVisible({ title, desc }: Props) {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full flex text-left group-hover:opacity-0 group-hover:pointer-events-none p-4 flex-wrap content-center transition-all duration-500 ease-in-out">
        <h2 className="w-full m-0 text-3xl font-medium">{title}</h2>
        <p style={{ textShadow: "0 1px 1px black" }} className="text-xs leading-6 w-1/2 max-w-64 drop-shadow-md">
          {desc}
        </p>
      </div>
    </>
  );
}
