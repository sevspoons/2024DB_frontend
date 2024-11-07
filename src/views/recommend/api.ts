import { getRank } from "@/api/common";

export const getTotalRank = () => {
  return getRank("total");
};
