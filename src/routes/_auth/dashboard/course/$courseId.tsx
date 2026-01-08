import { createFileRoute } from "@tanstack/react-router";
import { TaskListCourse } from "@/components/features/tasks/TaskListCourse.tsx";
import { CardButtonLink } from "@/components/common/CardButtonLink.tsx";
import { NewTaskButton } from "@/components/features/tasks/NewTaskButton.tsx";

export const Route = createFileRoute("/_auth/dashboard/course/$courseId")({
  component: CourseComponent,
});

function CourseComponent() {
  const { courseId: course_id } = Route.useParams();

  return (
    <div className="m-4 mt-4">
      <div className="mb-4 flex items-center justify-between">
        <CardButtonLink />
        <NewTaskButton courseTitle={"Course"} courseId={+course_id} />
      </div>
      <TaskListCourse course_id={+course_id} />
    </div>
  );
}
