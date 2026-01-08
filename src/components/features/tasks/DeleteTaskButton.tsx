import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/lib/task.ts";
import { toast } from "sonner";

interface DeleteTaskButtonProps {
  taskId: number;
}

export function DeleteTaskButton({ taskId }: DeleteTaskButtonProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["task", taskId],
    mutationFn: deleteTask,
    onSuccess: async () => {
      toast.success("Task deleted");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["tasks_overview"] }),
        queryClient.invalidateQueries({ queryKey: ["stats"] }),
      ]);
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"destructive"} size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Confirm Deletion</h4>
            <p className="text-muted-foreground text-sm">
              Are you sure you want to delete this task?
            </p>
          </div>
          <div className="flex justify-between gap-2">
            <PopoverClose asChild>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </PopoverClose>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteMutation.mutate({ task_id: taskId })}
              disabled={deleteMutation.isPending}>
              Yes, Delete
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
