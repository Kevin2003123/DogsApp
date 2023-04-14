import {
  GET_TEMPERAMENTS,
  GET_DOGS_API,
  GET_DOGS_DB,
  GET_DOGS_API_DB,
  ORDER_DOGS_NAME_ASC,
  ORDER_DOGS_NAME_DESC,
  ORDER_DOGS_WEIGHT_ASC,
  ORDER_DOGS_WEIGHT_DESC,
  FILTER_BY_TEMPERAMENT,
  GET_DOGS_BY_NAME,
  CHANGE_PAGE,
  FILTER_DOGS_API,
  FILTER_DOGS_DB,
  FILTER_DOGS_API_DB,
  SET_FILTER,
} from "./types";

const initialState = {
  temperaments: [],
  order: [],
  filter: [],
  allDogs: [],
  dogsFilter: [],
  filterStatus: false,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TEMPERAMENTS:
      return { ...state, temperaments: [...payload] };
    case GET_DOGS_API_DB:
      return { ...state, allDogs: [...payload] };
    case FILTER_DOGS_API_DB:
      return { ...state, filter: state.order };
    case FILTER_DOGS_DB:
      return {
        ...state,
        filter: state.order.filter((x) => !x.hasOwnProperty("origin")),
      };
    case FILTER_DOGS_API:
      return {
        ...state,
        filter: state.order.filter((x) => x.hasOwnProperty("origin")),
      };
    case SET_FILTER:
      return { ...state, filterStatus: payload };
    case GET_DOGS_API:
      return { ...state, allDogs: [...payload] };
    case GET_DOGS_DB:
      return { ...state, allDogs: [...payload] };
    case ORDER_DOGS_NAME_ASC:
      return {
        ...state,
        order: [...state.allDogs].sort((a, b) => a.name.localeCompare(b.name)),
      };
    case ORDER_DOGS_NAME_DESC:
      return {
        ...state,
        order: [...state.allDogs].sort((a, b) => b.name.localeCompare(a.name)),
      };
    case ORDER_DOGS_WEIGHT_ASC:
      return {
        ...state,
        order: [...state.allDogs].sort(
          (a, b) =>
            Number(a.weight.split(" - ")[0]) - Number(b.weight.split(" - ")[0])
        ),
      };
    case ORDER_DOGS_WEIGHT_DESC:
      return {
        ...state,
        order: [...state.allDogs].sort(
          (a, b) =>
            Number(b.weight.split(" - ")[0]) - Number(a.weight.split(" - ")[0])
        ),
      };
    case FILTER_BY_TEMPERAMENT:
      return {
        ...state,
        filter: [...state.order].filter((x) => {
          if (x.hasOwnProperty("origin")) {
            if (x.temperament === undefined) return false;
            else return x.temperament.split(", ").includes(payload);
          } else {
            return x.Temperaments.map((x) => x.name).includes(payload);
          }
        }),
      };
    case GET_DOGS_BY_NAME:
      return { ...state, filter: payload };

    case CHANGE_PAGE:
      return !state.filterStatus
        ? {
            ...state,
            dogsFilter: state.order.filter(
              (x, i) => i >= (payload - 1) * 8 && i < (payload - 1) * 8 + 8
            ),
          }
        : {
            ...state,
            dogsFilter: state.filter.filter(
              (x, i) => i >= (payload - 1) * 8 && i < (payload - 1) * 8 + 8
            ),
          };
    default:
      return state;
  }
};

export default rootReducer;
