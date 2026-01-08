import { CourseList } from "@/components/features/courses/CourseList.tsx";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export default function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("bg-background flex h-full flex-col border-r", className)}>
      <div className="flex h-20 items-center justify-center border-b">
        <Link to={"/dashboard"}>
          <img
            className="h-26 w-auto dark:invert"
            src="/logo2.png"
            alt="Logo"
            width={192}
            height={128}
          />
        </Link>
      </div>
      <CourseList />
    </aside>
  );
}
