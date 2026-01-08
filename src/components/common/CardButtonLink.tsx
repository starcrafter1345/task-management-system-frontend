import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function CardButtonLink() {
  return (
    <Link to={"/dashboard"}>
      <div className="inline-flex transform items-center rounded-lg border border-gray-200 px-4 py-2 shadow-sm transition-transform duration-200 will-change-transform hover:-translate-y-1 hover:shadow-lg">
        <ArrowLeft className="text-muted-foreground mr-1 inline size-4" />
        <span className="font-semibold">Back to overview</span>
      </div>
    </Link>
  );
}
