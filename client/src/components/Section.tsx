import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClassName?: string;
  divider?: boolean;
}

export function Section({ children, className, containerClassName, divider = true, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "py-20 md:py-32 relative",
        divider && "border-b border-border/30",
        className
      )}
      {...props}
    >
      <div className={cn("container mx-auto px-6 md:px-10 max-w-5xl", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
