interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  className?: string;
  content?: "max" | "full";
}

export default function Main({ children, className, content = "full" }: React.PropsWithChildren<Props>) {
  return <main className={`${className ?? "md:flex-1"} max-w-full h-${content} max-h-min flex flex-col px-8 pt-4 pb-0 md:overflow-hiddsen`}>{children}</main>;
}
