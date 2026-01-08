import type { Control, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";

export function CompletedToggle<T extends { completed: boolean }>({
  control,
}: {
  control: Control<T>;
}) {
  return (
    <FormField
      control={control}
      name={"completed" as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="-mt-2.5">Completed</FormLabel>
          <FormMessage />
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} className="size-6" />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
