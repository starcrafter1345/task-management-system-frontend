import type { Control, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar.tsx";

export function DatePicker<T extends { due_time: string }>({ control }: { control: Control<T> }) {
  return (
    <FormField
      control={control}
      name={"due_time" as Path<T>}
      render={({ field }) => (
        <FormItem className="mb-4 flex flex-col">
          <FormLabel>Due time</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}>
                  {field.value ? (
                    formatISO(new Date(field.value), { representation: "date" })
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start" side="top">
              <Calendar
                mode="single"
                selected={new Date(field.value!)}
                onSelect={(date) => field.onChange(date?.toISOString())}
                disabled={(date) => date < new Date()}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
