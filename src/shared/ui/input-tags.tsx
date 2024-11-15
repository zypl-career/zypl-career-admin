import * as React from "react";
import { Badge, Button } from "@ui";
import { XIcon } from "lucide-react";
import { cn } from "@libs";
import { type InputProps } from "./input";

type InputTagsProps = Omit<InputProps, "value" | "onChange"> & {
  value: string[] | string;
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
};

const InputTags = React.forwardRef<HTMLInputElement, InputTagsProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = React.useState("");
    const arrayValue = React.useMemo(() => Array.isArray(value) ? value : [value], [value]);

    React.useEffect(() => {
      if (pendingDataPoint.includes(",")) {
        const newDataPoints = new Set([
          ...arrayValue,
          ...pendingDataPoint.split(",").map((chunk) => chunk.trim()),
        ]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    }, [pendingDataPoint, onChange, arrayValue]);

    const addPendingDataPoint = React.useCallback(() => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...arrayValue, pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    }, [onChange, pendingDataPoint, arrayValue]);

    const handleAddTag = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addPendingDataPoint();
      } else if (
        e.key === "Backspace" &&
        pendingDataPoint.length === 0 &&
        value.length > 0
      ) {
        e.preventDefault();
        onChange(arrayValue.slice(0, -1));
      }
    }, [pendingDataPoint.length, value.length, addPendingDataPoint, onChange, arrayValue]);

    return (
      <div
        className={cn(
          // caveat: :has() variant requires tailwind v3.4 or above: https://tailwindcss.com/blog/tailwindcss-v3-4#new-has-variant
          "has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-neutral-950 has-[:focus-visible]:ring-offset-2 dark:has-[:focus-visible]:ring-neutral-300 min-h-10 flex w-full flex-wrap gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white  disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        {arrayValue.map((item) => (
          <Badge key={item} variant="secondary">
            {item}
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 h-3 w-3"
              onClick={() => {
                onChange(arrayValue.filter((i) => i !== item));
              }}
            >
              <XIcon className="w-3" />
            </Button>
          </Badge>
        ))}
        <input
          className="flex-1 outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
          value={pendingDataPoint}
          onChange={(e) => setPendingDataPoint(e.target.value)}
          onKeyDown={handleAddTag}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

InputTags.displayName = "InputTags";

export { InputTags };