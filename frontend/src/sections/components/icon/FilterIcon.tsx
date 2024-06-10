import { lazy, Suspense } from "react";
import { type Size } from "../../../types/const";
import { type Color } from ".";
const Icon = lazy(async () => import(".").then((m) => ({ default: m.Icon })));

export function FilterIcon({color, size}: {color?: Color, size?: Size}) {
  return (
    <Suspense>      
      <Icon
        size={size}
        color={color}
        type='filter'
      />
    </Suspense>
  )
}
