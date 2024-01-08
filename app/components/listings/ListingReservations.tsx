"use client";

import React from "react";

import { Range } from "react-date-range";
import Calender from "../Inputs/Calender";
import Button from "../Button";

interface ListingReservationsProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

const ListingReservations: React.FC<ListingReservationsProps> = ({
  price,
  dateRange,
  totalPrice,
  disabled,
  onChangeDate,
  disabledDates,
  onSubmit,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calender
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg ">
        <div>Total</div>

        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservations;
