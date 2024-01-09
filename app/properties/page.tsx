import React, { Suspense } from "react";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" />;
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    <EmptyState title="No Properties" />;
  }
  return (
    <div>
      <Suspense>
        <PropertiesClient listings={listings} currentUser={currentUser} />
      </Suspense>
    </div>
  );
};

export default PropertiesPage;
