import React, { lazy } from "react";
import { type Size } from "../../../types/const";
const Icon = lazy(async () => import(".").then((m) => ({ default: m.Icon })));

export function EditIcon({ isDisabled, children, size }: React.PropsWithChildren<{ isDisabled?: boolean; size?: Size }>) {
  return (
    <div className={`${size} ml-3 rounded-full rounded-l-full bg-secondary`}>
      <Icon isDisabled={isDisabled} type='edit' size={size}>
        {children}
      </Icon>
    </div>
  );
}
