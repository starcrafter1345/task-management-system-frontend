import { useForm } from "react-hook-form";
import type { NewTask } from "@/types/Task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "@/lib/task.ts";
import { useEffect } from "react";
import { DialogClose } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Form } from "@/components/ui/form.tsx";
import { TaskNameInput } from "@/components/features/tasks/components/TaskNameInput.tsx";
import { CompletedToggle } from "@/components/features/tasks/components/CompletedToggle.tsx";
import { DescriptionTextArea } from "@/components/features/tasks/components/DescriptionTextArea.tsx";
import { DatePicker } from "@/components/features/tasks/components/DatePicker.tsx";
import { toast } from "sonner";

interface NewTaskFormProps {
  courseId: number;
  afterSubmit?: () => void;
}

export function NewTaskForm({ courseId, afterSubmit }: NewTaskFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<NewTask>({
    defaultValues: {
      completed: false,
      course_id: courseId,
      due_time: new Date().toISOString(),
      description: "",
      name: "",
    },
  });
  const watch = form.watch;

  const mutation = useMutation({
    mutationKey: ["tasks_overview"],
    mutationFn: addTask,
    onSuccess: async () => {
      toast.success("Task created");
      form.reset();
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["tasks_overview"] }),
        queryClient.invalidateQueries({ queryKey: ["courses"] }),
        queryClient.invalidateQueries({ queryKey: ["stats"] }),
      ]);
      if (afterSubmit) {
        afterSubmit();
      }
    },
  });

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("taskDraft", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  function handleSubmitTask(data: NewTask) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitTask)}>
        <div className="flex flex-row gap-4">
          <TaskNameInput control={form.control} />

          <CompletedToggle control={form.control} />
        </div>

        <DescriptionTextArea control={form.control} />

        <DatePicker control={form.control} />

        <div className="flex flex-row justify-between">
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                form.reset();
              }}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
