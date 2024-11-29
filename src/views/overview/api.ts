import { getOverviewByPage } from "@/api/common";

export const getOverview = _config => {
  let canteen = "";
  if (_config.canteen.zone != null) {
    canteen += _config.canteen.zone.name;
    if (_config.canteen.area != null) {
      canteen += "-" + _config.canteen.area.name;
      if (_config.canteen.canteen != null) {
        canteen += "-" + _config.canteen.canteen.name;
      }
    }
  }

  const data = {
    config: {
      canteen: canteen,
      maxPrice: _config.maxPrice == null ? -1 : _config.maxPrice
    }
  };
  return getOverviewByPage(_config.curPage, _config.pageSize, data);
};
