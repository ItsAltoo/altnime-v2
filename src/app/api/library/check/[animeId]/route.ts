import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  params : { params: Promise<{ animeId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ isBookmarked: false });
    }

    const { animeId } = await params.params;
    const animeIdNumber = parseInt(animeId);

    const userLibrary = await prisma.library.findFirst({
      where: {
        userEmail: session.user.email,
      },
    });

    if (!userLibrary) {
      return NextResponse.json({ isBookmarked: false });
    }

    const bookmark = await prisma.cardLibrary.findFirst({
      where: {
        libraryId: userLibrary.id,
        animeId: animeIdNumber,
      },
    });

    return NextResponse.json({
      isBookmarked: !!bookmark,
    });
  } catch (error) {
    console.error("Error checking bookmark status:", error);
    return NextResponse.json(
      { error: "Failed to check bookmark status" },
      { status: 500 }
    );
  }
}
