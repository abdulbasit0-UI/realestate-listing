import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import EmptyState from "../components/EmptyState";
import React, { Suspense } from "react";
import FavoriteClient from "./FavoriteClient";
import ClientOnly from "../components/ClientOnly";

const page = async () => {
  const currentUser = await getCurrentUser();
  const favorites = await getFavorites();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" />
      </ClientOnly>
    );
  }

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No Favorites" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoriteClient favorites={favorites} currentUser={currentUser} />;
    </ClientOnly>
  );
};

export default page;
