import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Ellipsis } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CourseCardLink({ course_id }: { course_id: number }) {
  return (
    <Link
      to={`/dashboard/course/$courseId`}
      params={{ courseId: course_id.toString() }}
      from="/dashboard"
      className="cursor-default">
      <Card className="basis-4xs transform transition-transform duration-200 will-change-transform hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
          <Ellipsis className="text-muted-foreground size-8" />
        </CardHeader>
        <CardContent className="text-center text-lg font-semibold">To the course</CardContent>
      </Card>
    </Link>
  );
}
