"use client";

import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
interface ListingCardProps {
  data: Listing;
  reservations?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  actionId = "",
  actionLabel,
  currentUser,
  disabled,
  onAction,
  reservations,
}) => {
  const router = useRouter();

  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservations) {
      return reservations.totalPrice;
    }
    return data.price;
  }, [reservations, data]);

  const reservationDate = useMemo(() => {
    if (!reservations) {
      return null;
    }

    const start = new Date(reservations.startDate);
    const endDate = new Date(reservations.endDate);

    return `${format(start, "PP")} - ${format(endDate, "PP")}`;
  }, [reservations]);
  return (
    <div
      onClick={() => router.push(`/listing/${data.id}`)}
      className="col-span-1 cursor-pointer  group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            src={data.imageSrc}
            alt="Listing image"
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservations && <div className="font-light">night</div>}
        </div>
        <div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
