import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      category,
      imageSrc,
      guestCount,
      roomCount,
      bathroomCount,
      userId: currentUser.id,
      price: parseInt(price, 10),
      locationValue: location.value,
    },
  });

  return NextResponse.json(listing);
}
