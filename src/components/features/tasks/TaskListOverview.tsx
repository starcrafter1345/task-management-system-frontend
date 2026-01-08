import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TaskCard } from "./TaskCard.tsx";
import { useQuery } from "@tanstack/react-query";
import { NewTaskCard } from "./NewTaskCard.tsx";
import { CourseCardLink } from "@/components/features/courses/CourseCardLink.tsx";
import { getTasksGroupedByCoursesQueryOptions } from "@/lib/tasks_views.ts";

export function TaskListOverview() {
  const { data: courses, isFetching } = useQuery(getTasksGroupedByCoursesQueryOptions);

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  if (!courses) {
    return <div>No courses</div>;
  }

  return (
    <div className="mt-4">
      <Accordion type="multiple">
        {courses.map((course) => (
          <AccordionItem value={course.title} key={String(course.id)}>
            <AccordionTrigger className="text-lg px-1">{course.title}</AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="flex gap-4 overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-1">
                {course.tasks.map((task) => (
                  <TaskCard key={task.id} {...task} task_id={task.id} course_id={course.id} />
                ))}
                <CourseCardLink course_id={course.id} />
                <NewTaskCard courseTitle={course.title} courseId={course.id} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
