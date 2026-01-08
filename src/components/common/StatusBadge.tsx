import { Badge } from "@/components/ui/badge.tsx";
import { cn } from "@/lib/utils.ts";

export function StatusBadge({ completed, due_time }: { completed: boolean; due_time: string }) {
  const parsedDueTime = new Date(due_time);
  const nowTime = new Date();

  const style = "absolute top-[0px] right-px";

  if (!completed && parsedDueTime < nowTime) {
    return (
      <Badge variant={"destructive"} className={style}>
        Overdue
      </Badge>
    );
  } else if (!completed && new Date(due_time) > new Date()) {
    return (
      <Badge variant="default" className={style}>
        In Progress
      </Badge>
    );
  } else {
    return <Badge className={cn(style, "bg-green-500")}>Completed</Badge>;
  }
}
