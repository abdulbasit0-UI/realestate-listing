import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavorites() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFav = favorites.map((fav) => ({
      ...fav,
      createdAt: fav.createdAt.toISOString(),
    }));

    return safeFav;
  } catch (e: any) {
    throw new Error(e);
  }
}
