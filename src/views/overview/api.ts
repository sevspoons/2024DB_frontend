import { getOverviewByPage } from "@/api/common";

export const getOverview = _config => {
  const data = {
    config: {
      canteen: _config.canteen == null ? "" : _config.canteen,
      maxPrice: _config.maxPrice == null ? -1 : _config.maxPrice
    }
  };
  return getOverviewByPage(_config.curPage, _config.pageSize, data);
};
