import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TaskCard } from "./TaskCard.tsx";
import { useQuery } from "@tanstack/react-query";
import { getTasksGroupedByDatesQueryOptions } from "@/lib/tasks_views.ts";

export function TaskListCourse({ course_id }: { course_id: number }) {
  const { data: course, isFetching } = useQuery(getTasksGroupedByDatesQueryOptions(course_id));

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  if (!course) {
    return <div>No courses</div>;
  }

  return (
    <div className="mx-4 mt-4">
      <Accordion type="multiple">
        {Object.entries(course.tasks).map(([date, tasks]) => (
          <AccordionItem value={date} key={date}>
            <AccordionTrigger className="text-lg">{date}</AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="flex gap-4 overflow-x-auto py-2">
                {tasks.map((task) => (
                  <TaskCard key={task.id} {...task} task_id={task.id} course_id={course.id} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
