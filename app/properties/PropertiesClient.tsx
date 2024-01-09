"use client";

import { Listing, Reservation, User } from "@prisma/client";
import React, { useCallback, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeReservation, SafeUser } from "../types";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  currentUser,
  listings,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing Deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.response.data.error);
          router.refresh();
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="My Properties" subtitle="Your properties on Airbnb" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => {
          return (
            <ListingCard
              actionId={listing.id}
              onAction={onCancel}
              actionLabel="Delete Properties"
              key={listing.id}
              data={listing}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
