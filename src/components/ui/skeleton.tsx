import { cn } from "@/lib/utils";
import { times } from "ramda";

type Props = {
  className?: string;
  children?: React.ReactNode;
  cond?: boolean;
  count?: number;
};

function Skeleton({
  className,
  children,
  cond = true,
  count = 1,
  ...props
}: Props) {
  return (
    <>
      {}
      {cond
        ? times(
            (i) => (
              <div
                key={i}
                className={cn("animate-pulse rounded-md bg-muted", className)}
                {...props}
              />
            ),
            count
          )
        : children}
    </>
  );
}

export { Skeleton };
