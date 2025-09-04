import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function GET(
  req: NextRequest,
  { params }: { params: { animeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ isBookmarked: false });
    }

    const animeId = parseInt(params.animeId);

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
        animeId: animeId,
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
