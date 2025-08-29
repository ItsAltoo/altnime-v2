"use client";

import { useSession } from "next-auth/react";
import LibrarySignIn from "./LibrarySignIn";
import LibraryContent from "./LibraryContent";

const LibraryView = () => {
  const { data: session } = useSession();
  return <>{session?.user ? <LibraryContent /> : <LibrarySignIn />}</>;
};

export default LibraryView;
