import React from "react";
import { Button } from "./ui/button";
import { BookIcon, Loader2Icon, TrashIcon } from "lucide-react";
import { BookmarkButtonProps } from "@/types";
import { useBookmark } from "@/lib/hooks/useBookmark";

const BookmarkButton = (props: BookmarkButtonProps) => {
  const {
    handleBookmark,
    handleRemoveBookmark,
    isBookmarked,
    isLoading,
    sessionStatus,
  } = useBookmark(props);

  if (sessionStatus === "loading") {
    return (
      <Button className="cursor-pointer" disabled>
        <BookIcon className="mr-2" />
        Loading...
      </Button>
    );
  }

  if (sessionStatus === "unauthenticated") {
    return (
      <Button
        onClick={handleBookmark}
        className="cursor-pointer"
        variant="outline"
      >
        <BookIcon className="mr-2" />
        Please Sign In First
      </Button>
    );
  }

  if (isBookmarked) {
    return (
      <Button
        onClick={handleRemoveBookmark}
        className="cursor-pointer"
        variant={"destructive"}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2Icon className="animate-spin mr-2" />
        ) : (
          <TrashIcon className="mr-2" />
        )}
        Remove Bookmark
      </Button>
    );
  }

  return (
    <Button
      onClick={handleBookmark}
      className="cursor-pointer"
      disabled={isLoading}
    >
      <BookIcon className="mr-2" />
      {isLoading ? <Loader2Icon className="animate-spin" /> : "Bookmark"}
    </Button>
  );
};

export default BookmarkButton;
