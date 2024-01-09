import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import EmptyState from "../components/EmptyState";
import React, { Suspense } from "react";
import FavoriteClient from "./FavoriteClient";

const page = async () => {
  const currentUser = await getCurrentUser();
  const favorites = await getFavorites();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" />;
  }

  if (favorites.length === 0) {
    return <EmptyState title="No Favorites" />;
  }

  return;
  <Suspense>
    <FavoriteClient favorites={favorites} currentUser={currentUser} />;
  </Suspense>;
};

export default page;
