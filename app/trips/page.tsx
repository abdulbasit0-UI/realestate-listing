import React, { Suspense } from "react";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";
import ClientOnly from "../components/ClientOnly";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No Reservations" />;
      </ClientOnly>
    );
  }
  return (
    <div>
      <ClientOnly>
        <TripsClient reservations={reservations} currentUser={currentUser} />
      </ClientOnly>
    </div>
  );
};

export default TripsPage;
