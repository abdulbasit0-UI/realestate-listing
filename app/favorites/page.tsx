import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import EmptyState from "../components/EmptyState";
import React from "react";
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

  return <FavoriteClient favorites={favorites} currentUser={currentUser} />;
};

export default page;
