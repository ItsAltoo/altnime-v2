import React, { useState } from "react";
import { Button } from "./ui/button";
import { BookIcon, Loader2Icon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface BookmarkButtonProps {
  userEmail?: string; // Optional: akan menggunakan session email jika tidak disediakan
  animeId: number;
  onSuccess?: () => void; // Optional callback ketika bookmark berhasil ditambah
  onError?: (error: string) => void; // Optional callback ketika terjadi error
}

const BookmarkButton = ({
  userEmail,
  animeId,
  onSuccess,
  onError,
}: BookmarkButtonProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmark = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Check if user is authenticated
    if (status === "loading") {
      toast.error("Please wait, checking authentication...");
      return;
    }

    if (status === "unauthenticated" || !session?.user) {
      toast.warning("Please login to add bookmarks", {
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      });
      return;
    }

    // Validate required data
    if (!userEmail && !session.user.email) {
      toast.error("User email is required to add bookmark");
      return;
    }

    if (!animeId || typeof animeId !== "number") {
      toast.error("Invalid anime ID");
      return;
    }

    setIsLoading(true);

    const data = {
      userEmail: userEmail || session.user.email,
      animeId,
    };

    try {
      const response = await axios.post("/api/library", data);

      // Handle successful response
      if (response.status === 200 || response.status === 201) {
        const successMessage =
          response.data.message || "Bookmark added successfully!";
        toast.success(successMessage);
        console.log("Bookmark added:", response.data);

        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error: any) {
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
        if (onError) {
          onError(errorMessage);
        }
      } else if (error.request) {
        const errorMessage = "Network error. Please check your connection.";
        toast.error(errorMessage);
        if (onError) onError(errorMessage);
      } else {
        const errorMessage = "An unexpected error occurred";
        toast.error(errorMessage);
        if (onError) onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Show different button states based on authentication
  if (status === "loading") {
    return (
      <Button className="cursor-pointer" disabled>
        <BookIcon />
        Loading...
      </Button>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Button
        onClick={handleBookmark}
        className="cursor-pointer"
        variant="outline"
      >
        <BookIcon />
        Please Sign In First
      </Button>
    );
  }

  return (
    <>
      <Button
        onClick={handleBookmark}
        className="cursor-pointer"
        disabled={isLoading}
      >
        <BookIcon />
        {isLoading ? <Loader2Icon className="animate-spin" /> : "Bookmark"}
      </Button>
    </>
  );
};

export default BookmarkButton;
