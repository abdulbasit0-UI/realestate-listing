import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import { User } from "@prisma/client";
import { SafeUser } from "../types";

interface IuseFav {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFav = ({ listingId, currentUser }: IuseFav) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFav = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);
  const toggleFav = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFav) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("success");
      } catch (e: any) {
        toast.error("something went wrong");
      }
    },
    [currentUser, hasFav, router, listingId, loginModal]
  );

  return {
    hasFav,
    toggleFav,
  };
};

export default useFav;
