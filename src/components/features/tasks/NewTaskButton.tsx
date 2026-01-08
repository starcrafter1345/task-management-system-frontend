import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Plus } from "lucide-react";
import { NewTaskForm } from "./NewTaskForm.tsx";

interface NewTaskButtonProps {
  courseTitle: string;
  courseId: number;
}

export function NewTaskButton({ courseTitle, courseId }: NewTaskButtonProps) {
  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <div className="inline-flex transform cursor-pointer items-center rounded-lg border border-gray-200 px-4 py-2 shadow-sm transition-transform duration-200 will-change-transform hover:-translate-y-1 hover:shadow-lg">
          <Plus className="text-muted-foreground mr-1 inline size-4" />
          <span className="font-semibold">Create a task</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogDescription></DialogDescription>
        <DialogHeader className="text-lg font-semibold">
          <DialogTitle>Create new task for "{courseTitle}" course</DialogTitle>
        </DialogHeader>
        <NewTaskForm courseId={courseId} />
      </DialogContent>
    </Dialog>
  );
}
