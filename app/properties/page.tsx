import React, { Suspense } from "react";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";
import ClientOnly from "../components/ClientOnly";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No Properties" />
      </ClientOnly>
    );
  }
  return (
    <div>
      <ClientOnly>
        <PropertiesClient listings={listings} currentUser={currentUser} />
      </ClientOnly>
    </div>
  );
};

export default PropertiesPage;
