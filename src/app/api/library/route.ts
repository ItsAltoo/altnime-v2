import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await prisma.library.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        animeId: true,
        id: true,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch library data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Authentication required",
          message: "Please login to add bookmarks",
        },
        { status: 401 }
      );
    }

    const { animeId, userId, userEmail } = await req.json();

    if (!animeId || (!userId && !userEmail)) {
      return NextResponse.json(
        {
          error: "animeId and either userId or userEmail are required",
        },
        {
          status: 400,
        }
      );
    }

    let finalUserId = userId;
    if (!userId && userEmail) {
      const user = await prisma.user.findFirst({
        where: { email: userEmail },
        select: { id: true },
      });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      finalUserId = user.id;
    }

    const existingBookmark = await prisma.library.findFirst({
      where: {
        userId: finalUserId,
        animeId: parseInt(animeId),
      },
    });

    if (existingBookmark) {
      return NextResponse.json(
        {
          error: "Bookmark already exists",
          message: "This anime is already in your library",
          data: existingBookmark,
        },
        { status: 409 }
      );
    }

    const data = await prisma.library.create({
      data: {
        userId: finalUserId,
        animeId: parseInt(animeId),
        userEmail: userEmail || undefined,
      },
    });

    return NextResponse.json({
      message: "Bookmark added successfully",
      data,
    });
  } catch (error) {
    console.error("Failed to add to library:", error);
    return NextResponse.json(
      {
        error: "Failed to add to library",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    // Check authentication first
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Authentication required",
          message: "Please login to remove bookmarks",
        },
        { status: 401 }
      );
    }

    const { animeId, userId, userEmail } = await req.json();

    // Validation
    if (!animeId || (!userId && !userEmail)) {
      return NextResponse.json(
        {
          error: "animeId and either userId or userEmail are required",
        },
        { status: 400 }
      );
    }

    // Get user ID if only email is provided
    let finalUserId = userId;
    if (!userId && userEmail) {
      const user = await prisma.user.findFirst({
        where: { email: userEmail },
        select: { id: true },
      });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      finalUserId = user.id;
    }

    // Delete bookmark
    const deletedBookmark = await prisma.library.deleteMany({
      where: {
        userId: finalUserId,
        animeId: parseInt(animeId),
      },
    });

    if (deletedBookmark.count === 0) {
      return NextResponse.json(
        { error: "Bookmark not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Bookmark removed successfully",
    });
  } catch (error) {
    console.error("Failed to remove from library:", error);
    return NextResponse.json(
      {
        error: "Failed to remove from library",
      },
      { status: 500 }
    );
  }
};
