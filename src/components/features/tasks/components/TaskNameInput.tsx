import type { Control, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";

export function TaskNameInput<T extends { name: string }>({ control }: { control: Control<T> }) {
  return (
    <FormField
      control={control}
      name={"name" as Path<T>}
      render={({ field }) => (
        <FormItem className="mb-4 w-90">
          <FormLabel>Task name</FormLabel>
          <FormMessage />
          <FormControl>
            <Input placeholder="I.e., Quadratic function" {...field} required />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
