"use client";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Describe your place" subtitle="Pick a category" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => {
          return (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue("category", category)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <Modal
      title="Airbnb your home!"
      isOpen={rentModal.isOpen}
      body={bodyContent}
      onclose={rentModal.onClose}
      secondaryLabel={secondaryActionLabel}
      onSubmit={rentModal.onClose}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      actionLabel={actionLabel}
    />
  );
};

export default RentModal;