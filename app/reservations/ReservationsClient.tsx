"use client";

import React, { useCallback, useState } from "react";
import { SafeReservation, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import Container from "../components/Container";
import Heading from "../components/Heading";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const [isDeletingId, setIsDeletingId] = useState("");
  const router = useRouter();
  const onCancel = useCallback(
    (id: string) => {
      setIsDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Canceled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setIsDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Reservations" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservations={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={isDeletingId === reservation.id}
              actionLabel="Cancel Reservation"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default ReservationsClient;
