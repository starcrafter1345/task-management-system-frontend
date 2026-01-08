import type { Control, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";

export function DescriptionTextArea<T extends { description: string }>({
  control,
}: {
  control: Control<T>;
}) {
  return (
    <FormField
      control={control}
      name={"description" as Path<T>}
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Description</FormLabel>
          <FormMessage />
          <FormControl>
            <Textarea {...field} className="h-36 font-semibold" />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
