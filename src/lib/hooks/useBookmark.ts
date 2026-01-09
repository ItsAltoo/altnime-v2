import { ApiError, BookmarkButtonProps } from "@/types";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export const useBookmark = (props: BookmarkButtonProps) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (sessionStatus === "authenticated" && session?.user?.email) {
        try {
          const res = await axios.get(`/api/library/check/${props.animeId}`);
          setIsBookmarked(res.data.isBookmarked);
        } catch (error) {
          toast.error("Failed to check bookmark status");
        }
      }
    };

    checkBookmarkStatus();
  }, [props.animeId, session?.user?.email, sessionStatus]);

  const handleRemoveBookmark = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.delete("/api/library", {
        data: {
          userEmail: props.userEmail || session?.user?.email,
          animeId: props.animeId,
        },
      });

      if (response.status === 200) {
        toast.success("Bookmark removed successfully!");
        setIsBookmarked(false);
        props.onSuccess?.();
      }
    } catch (err) {
      const error = err as AxiosError<ApiError>;

      console.error("Error removing bookmark:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to remove bookmark";
      toast.error(errorMessage);
      props.onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookmark = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (sessionStatus === "loading") {
      toast.error("Please wait, checking authentication...");
      return;
    }

    if (sessionStatus === "unauthenticated" || !session?.user) {
      toast.warning("Please login to add bookmarks", {
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      });
      return;
    }

    // Validate required data
    if (!props.userEmail && !session?.user.email) {
      toast.error("User email is required to add bookmark");
      return;
    }

    if (!props.animeId || typeof props.animeId !== "number") {
      toast.error("Invalid anime ID");
      return;
    }

    setIsLoading(true);

    const data = {
      userEmail: props.userEmail || session?.user.email,
      animeId: props.animeId,
      imageUrl: props.imageUrl,
      title: props.title,
      name: props.name,
      status: props.status,
      type: props.type,
      score: props.score,
      episodes: props.episodes,
      chapters: props.chapters,
    };

    try {
      const response = await axios.post("/api/library", data);

      if (response.status === 200 || response.status === 201) {
        const successMessage =
          response.data.message || "Bookmark added successfully!";
        toast.success(successMessage);
        setIsBookmarked(true);
        if (props.onSuccess) props.onSuccess();
      }
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      console.error("Error adding bookmark:", error);

      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = "";

        switch (status) {
          case 401:
            errorMessage = "Please login to add bookmarks";
            toast.warning(errorMessage, {
              action: {
                label: "Login",
                onClick: () => router.push("/login"),
              },
            });
            break;

          case 404:
            errorMessage = "User not found. Please try logging in again.";
            toast.error(errorMessage);
            break;

          case 409:
            errorMessage = "This anime is already in your library!";
            toast.warning(data.message || errorMessage, {
              description: "You can view it in your library page.",
              action: {
                label: "View Library",
                onClick: () => router.push("/library"),
              },
            });
            break;

          case 400:
            errorMessage = data.error || "Invalid request data";
            toast.error(errorMessage);
            break;

          case 500:
            errorMessage = "Server error. Please try again later.";
            toast.error(errorMessage);
            break;

          default:
            errorMessage = data.error || "Failed to add bookmark";
            toast.error(errorMessage);
        }

        // Call error callback if provided
        if (props.onError) {
          props.onError(errorMessage);
        }
      } else if (error.request) {
        const errorMessage = "Network error. Please check your connection.";
        toast.error(errorMessage);
        if (props.onError) props.onError(errorMessage);
      } else {
        const errorMessage = "An unexpected error occurred";
        toast.error(errorMessage);
        if (props.onError) props.onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isBookmarked,
    isLoading,
    sessionStatus,
    handleBookmark,
    handleRemoveBookmark,
  };
};
