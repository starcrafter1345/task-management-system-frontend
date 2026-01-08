import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HexColorPicker } from "react-colorful";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourse, updateCourse } from "@/lib/courses_sidebar";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const htmlColorInputSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/, {
  message: "Invalid color format. Must be a 7-character hex code (e.g., #RRGGBB).",
});

const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  color: htmlColorInputSchema,
});

type CourseValues = z.infer<typeof courseSchema>;

interface CourseMenuProps {
  courseId: number;
  title: string;
  color: string;
}

export function CourseMenu({ courseId, title, color }: CourseMenuProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CourseValues>({
    defaultValues: {
      title: title,
      color: color,
    },
    resolver: standardSchemaResolver(courseSchema),
  });

  const updateMutation = useMutation({
    mutationFn: (data: CourseValues) => updateCourse({ id: courseId, data }),
    onSuccess: async () => {
      toast.success("Course updated");
      setOpen(false);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["courses"] }),
        queryClient.invalidateQueries({ queryKey: ["tasks_overview"] }),
      ]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteCourse(courseId),
    onSuccess: async () => {
      toast.success("Course deleted");
      setOpen(false);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["courses"] }),
        queryClient.invalidateQueries({ queryKey: ["tasks_overview"] }),
      ]);
    },
  });

  function onSubmit(data: CourseValues) {
    updateMutation.mutate(data);
  }

  return (
    <Popover
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        setIsDeleting(false);
        form.reset({ title, color });
      }}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={(e) => e.stopPropagation()}>
          <EllipsisVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" onClick={(e) => e.stopPropagation()}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Edit Course</h4>
            <p className="text-muted-foreground text-sm">Update course details.</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <HexColorPicker color={field.value} onChange={field.onChange} />
                        <div className="flex items-center gap-2">
                          <div
                            className="h-6 w-6 rounded-full border"
                            style={{ backgroundColor: field.value }}
                          />
                          <span className="text-muted-foreground text-xs">{field.value}</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={updateMutation.isPending} className="w-full">
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>

          <Separator />

          {!isDeleting ? (
            <Button variant="destructive" onClick={() => setIsDeleting(true)} className="w-full">
              Delete Course
            </Button>
          ) : (
            <div className="space-y-2 rounded-md border border-red-200 bg-red-50 p-2">
              <p className="text-center text-xs font-medium text-red-800">
                Are you sure? This cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-red-200 text-red-800 hover:bg-red-100"
                  onClick={() => setIsDeleting(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}>
                  {deleteMutation.isPending ? "Deleting..." : "Confirm"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
