import LibraryView from "@/views/Library/LibraryView";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      <Suspense>
        <LibraryView />
      </Suspense>
    </>
  );
};

export default page;
