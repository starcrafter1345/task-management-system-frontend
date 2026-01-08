import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { coursesQueryOptions } from "@/lib/courses_sidebar.ts";
import { useForm } from "react-hook-form";
import { addCourse } from "@/lib/courses_sidebar.ts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Check, Plus, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { HexColorPicker } from "react-colorful";
import { PopoverClose } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Link } from "@tanstack/react-router";
import { CourseMenu } from "@/components/features/courses/CourseMenu.tsx";
import { toast } from "sonner";

const htmlColorInputSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/, {
  message: "Invalid color format. Must be a 7-character hex code (e.g., #RRGGBB).",
});

const newCourseSchema = z.object({
  title: z.string(),
  color: htmlColorInputSchema,
});

type newCourseValues = z.infer<typeof newCourseSchema>;

export function CourseList() {
  const { data: courses, isFetching } = useQuery(coursesQueryOptions);

  if (isFetching) {
    return (
      <ul className="mx-4 mt-8 flex flex-col gap-4">
        <li>
          <Skeleton className="h-[42px] w-full bg-gray-300" />
        </li>
        <li>
          <Skeleton className="h-[42px] w-full bg-gray-300" />
        </li>
        <li>
          <Skeleton className="h-[42px] w-full bg-gray-300" />
        </li>
      </ul>
    );
  }

  if (!courses) {
    return <div>No courses</div>;
  }

  return (
    <div>
      <ul className="mx-4 mt-8 flex flex-col gap-4">
        {courses.map((course) => (
          <li
            key={course.title}
            className="transform rounded-lg border border-gray-200 shadow-sm transition-transform duration-200 will-change-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center pr-2">
              <Link
                to={`/dashboard/course/$courseId`}
                params={{ courseId: course.id.toString() }}
                className="flex-grow px-4 py-2"
              >
                {course.title} ({course.taskCount}){" "}
                <div
                  style={{ backgroundColor: course.color }}
                  className="my-1 inline-block h-1.5 w-1.5 rounded-4xl"
                ></div>
              </Link>
              <CourseMenu
                courseId={course.id}
                title={course.title}
                color={course.color}
              />
            </div>
          </li>
        ))}
        <AddCourseCard />
      </ul>
    </div>
  );
}

function AddCourseCard() {
  const queryClient = useQueryClient();

  const form = useForm<newCourseValues>({
    defaultValues: {
      title: "",
      color: "#000000",
    },
    resolver: standardSchemaResolver(newCourseSchema),
  });

  const mutation = useMutation({
    mutationFn: addCourse,
    onSuccess: async () => {
      toast.success("Course created");
      form.reset();
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["courses"] }),
        queryClient.invalidateQueries({ queryKey: ["tasks_overview"] }),
      ]);
    },
  });

  function onSubmit(data: newCourseValues): void {
    mutation.mutate(data);
  }

  return (
    <Popover>
      <PopoverTrigger className="text-left">
        <li className="transform rounded-lg border border-gray-200 px-4 py-2 shadow-sm transition-transform duration-200 will-change-transform hover:-translate-y-1 hover:shadow-lg">
          <span>
            Add new course <Plus className="text-muted-foreground inline size-4" />
          </span>
        </li>
      </PopoverTrigger>
      <PopoverContent side="right" align="center">
        <Form {...form}>
          <h3 className="text-lg font-semibold">Create new course</h3>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name={"title"}
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Create title</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Choose color</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <HexColorPicker color={field.value} onChange={field.onChange} />
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: field.value }} />
                        <span className="text-xs text-muted-foreground">{field.value}</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 flex justify-center gap-4">
              <PopoverClose asChild>
                <Button
                  variant="destructive"
                  onClick={() => {
                    form.reset();
                  }}>
                  <X className="size-5" />
                </Button>
              </PopoverClose>
              <Button variant="default" type="submit" className="bg-green-300 hover:bg-green-500">
                <Check className="size-5" />
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}