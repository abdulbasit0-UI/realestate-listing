import React, { Suspense } from "react";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return <EmptyState title="No Reservations" />;
  }
  return (
    <Suspense>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </Suspense>
  );
};

export default ReservationsPage;
