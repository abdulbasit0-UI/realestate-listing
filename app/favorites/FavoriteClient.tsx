"use client";

import React from "react";
import { SafeListing, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavoriteClientProps {
  favorites: SafeListing[];
  currentUser: SafeUser | null;
}

const FavoriteClient: React.FC<FavoriteClientProps> = ({
  favorites,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="Your favorite listings are listed below"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favorites.map((favorite) => {
          return (
            <ListingCard
              key={favorite.id}
              data={favorite}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default FavoriteClient;
