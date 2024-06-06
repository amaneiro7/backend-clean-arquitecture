import { lazy, Suspense } from "react";
import { type TilesInvisible } from "./TilesInvisible";
import { type TilesVisible } from "./TilesVisible";

interface Props {
  children: Array<React.ReactElement<typeof TilesInvisible | typeof TilesVisible>>;
  img?: string;
}

const LazyCodeScrenImage = lazy(async () => import("../lazyImages/LazyCodeScreen").then((m) => ({ default: m.LazyCodeScrenImage })));
const LazyInventroyBoxes = lazy(async () => import("../lazyImages/LazyInventoryBoxes").then((m) => ({ default: m.LazyInventroyBoxes })));
const LazyOfficeNotebookImage = lazy(async () => import("../lazyImages/LazyOfficeNoteBookImg").then((m) => ({ default: m.LazyOfficeNotebookImage })));
const LazyOfficeTableDeskImg = lazy(async () => import("../lazyImages/LazyOfficeTableDeskImg").then((m) => ({ default: m.LazyOfficeTableDeskImg })));
const LazyDefaultImg = lazy(async () => import("../lazyImages/LazyDefaultImg").then((m) => ({ default: m.LazyDefaultImg })));

type RenderImg = typeof LazyCodeScrenImage | typeof LazyInventroyBoxes | typeof LazyOfficeNotebookImage | typeof LazyOfficeTableDeskImg | typeof LazyDefaultImg

const renderImg = {
  inventoryBox: LazyInventroyBoxes,
  officeDesk: LazyOfficeTableDeskImg,
  codeScreen: LazyCodeScrenImage,
  officeNotebook: LazyOfficeNotebookImage,
};
export function TilesBox({ children, img }: Props & { img: keyof typeof renderImg }) {
  const ImgToRender: RenderImg = renderImg[img] ?? LazyDefaultImg;
  return (
    <div className="overflow-hidden odd:text-white even:text-black group hover:before:-top-3/4 before:will-change-transform before:origin-center before:-rotate-[25deg] before:transition-all before:duration-500 before:ease-in-out before:absolute before:top-[200%] before:-left-3/4 before:w-[250%] before:block before:h-[220%] before:bg-primary relative w-full min-h72 h-72 bg-gradient-to-r odd:from-secondary even:from-white to-transparent">
      <Suspense>
        <ImgToRender className=" bg-cover w-full h-full max-w-full align-middle b-0" />
      </Suspense>
      {children}
    </div>
  );
}
