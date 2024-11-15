import { getRank } from "@/api/common";

export const getTotalRank = () => {
  return getRank("total");
};

export const getPriceRank = () => {
  return getRank("price");
};

export const getQuantityRank = () => {
  return getRank("quantity");
};
