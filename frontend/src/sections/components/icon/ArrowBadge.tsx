import { lazy, Suspense } from "react";
import { type SIZES, type Color } from ".";
const Icon = lazy(async () => import(".").then((m) => ({ default: m.Icon })));

export function ArrowBadgeIcon({ isDisabled, children, size, color }: React.PropsWithChildren<{ isDisabled?: boolean; color: Color; size?: (typeof SIZES)[keyof typeof SIZES] }>) {
  return (
    <Suspense>
      <Icon isDisabled={isDisabled} type="arrowBadge" size={size} color={color}>
        {children}
      </Icon>
    </Suspense>
  );
}
