/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext } from "react";
import { getMasters } from "../@api/masters.api";
import { useQuery } from "@tanstack/react-query";
import { MasterType } from "../@types/MasterType.type";

type Props = {
  children: ReactNode;
};

type MastersContentProps = {
  masters: MasterType[];
  mastersLoading: boolean;
  mastersError: Error | null;
};

const MastersContext = createContext({} as MastersContentProps);

export const useMastersContext = () => {
  const context = useContext(MastersContext);

  if (!context) throw new Error("Context must be used within ServicesContext");

  return context;
};

export const MastersContextContainer = ({ children }: Props) => {
  const {
    data: masters = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["masters"],
    queryFn: getMasters,
    refetchInterval: 5000,
  });

  return (
    <MastersContext.Provider
      value={{
        masters,
        mastersLoading: isPending,
        mastersError: error,
      }}
    >
      {children}
    </MastersContext.Provider>
  );
};
