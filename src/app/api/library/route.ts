import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await prisma.library.findMany({
      where: {
        userEmail: session.user.email,
      },
      select: {
        cards: true,
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

    // 1. Verifikasi sesi pengguna dari server (lebih aman)
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Authentication required",
          message: "Please login to add items to your library.",
        },
        { status: 401 }
      );
    }

    // 2. Ambil data KARTU dari body, bukan data user
    const {
      animeId,
      imageUrl,
      title,
      name,
      status,
      type,
      score,
      episodes,
      chapters,
      userId,
      userEmail,
    } = await req.json();

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

    // 3. Cari atau buat Library pengguna secara eksplisit karena userId bukan field unik
    let userLibrary = await prisma.library.findFirst({
      where: { userId: finalUserId },
    });
    if (!userLibrary) {
      userLibrary = await prisma.library.create({
        data: {
          userId: finalUserId,
          userEmail: userEmail,
        },
      });
    }

    // 4. Cek apakah anime sudah ada di library pengguna (CardLibrary)
    const existingCard = await prisma.cardLibrary.findFirst({
      where: {
        libraryId: userLibrary.id,
        animeId: animeId,
      },
    });

    if (existingCard) {
      return NextResponse.json(
        {
          error: "Bookmark already exists",
          message: "This item is already in your library.",
          data: existingCard,
        },
        { status: 409 } // 409 Conflict adalah status yang tepat untuk duplikat
      );
    }
    

    // 5. Buat entri baru di CardLibrary, bukan di Library
    const newCard = await prisma.cardLibrary.create({
      data: {
        libraryId: userLibrary.id, // Hubungkan ke library pengguna
        animeId,
        imageUrl,
        title,
        name,
        status,
        type,
        score,
        episodes,
        chapters,
      },
    });

    return NextResponse.json(
      {
        message: "Item added to library successfully",
        data: newCard,
      },
      { status: 201 }
    ); // 201 Created adalah status yang tepat untuk pembuatan resource baru
  } catch (error) {
    console.error("Failed to add to library:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to add item to library.",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Authentication required",
          message: "Please login to remove items from your library",
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
        { status: 400 }
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

    // Find user's library first
    const userLibrary = await prisma.library.findFirst({
      where: { userId: finalUserId },
    });

    if (!userLibrary) {
      return NextResponse.json({ error: "Library not found" }, { status: 404 });
    }

    // Delete the card from CardLibrary
    const deletedCard = await prisma.cardLibrary.deleteMany({
      where: {
        libraryId: userLibrary.id,
        animeId: animeId,
      },
    });

    if (deletedCard.count === 0) {
      return NextResponse.json(
        { error: "Item not found in library" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Item removed from library successfully",
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
