"use client";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const SearchFilters = () => {
  const searchModal = useSearchModal();
  const searchParams = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = searchParams.get("locationValue");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const guestCount = searchParams.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(startDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any week";
  }, [startDate, endDate]);

  const guestlabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Guests";
  }, [guestCount]);

  return (
    <div
      onClick={() => searchModal.onOpen()}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestlabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
