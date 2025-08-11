"use client";

// components
import { PageHead } from "@/components/core";
import { StickiesInfinite } from "@/components/stickies";

export default function WorkspaceStickiesPage() {
  return (
    <>
      <PageHead title="Seus post-its" />
      <div className="relative h-full w-full overflow-hidden overflow-y-auto">
        <StickiesInfinite />
      </div>
    </>
  );
}
