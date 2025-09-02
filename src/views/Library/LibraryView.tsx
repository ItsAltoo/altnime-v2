"use client";

import { useSession } from "next-auth/react";
import LibrarySignIn from "./LibrarySignIn";
import LibraryContent from "./LibraryContent";

const LibraryView = () => {
  const { data: session } = useSession();
  return (
    <div className="p-4">
      {session?.user ? <LibraryContent /> : <LibrarySignIn />}
    </div>
  );
};

export default LibraryView;
