import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Plus } from "lucide-react";
import { NewTaskForm } from "./NewTaskForm.tsx";

export function NewTaskCard({ courseTitle, courseId }: { courseTitle: string; courseId: number }) {
  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Card className="w-72 min-w-72 flex-shrink-0 transform cursor-pointer transition-transform duration-200 will-change-transform hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
            <Plus className="text-muted-foreground size-8" />
          </CardHeader>
          <CardContent className="text-center text-lg font-semibold">Add new task</CardContent>
        </Card>
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
