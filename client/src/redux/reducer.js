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
} from "./types";

const initialState = {
  temperaments: [],
  dogs: [],
  allDogs:[]
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TEMPERAMENTS:
      return { ...state, temperaments: [...payload] };
    case GET_DOGS_API_DB:
      return { ...state, dogs: [...payload], allDogs: [...payload] } ;
    case GET_DOGS_API:
      return { ...state, dogs: [...payload], allDogs: [...payload] };
    case GET_DOGS_DB:
      return { ...state, dogs: [...payload], allDogs: [...payload] };
    case ORDER_DOGS_NAME_ASC:
      return {
        ...state,
        dogs: [...state.allDogs].sort((a, b) => a.name.localeCompare(b.name)),
      };
    case ORDER_DOGS_NAME_DESC:
      return {
        ...state,
        dogs: [...state.allDogs].sort((a, b) => b.name.localeCompare(a.name)),
      };
    case ORDER_DOGS_WEIGHT_ASC:
      return {
        ...state,
        dogs: [...state.allDogs].sort(
          (a, b) =>
            Number(a.weight.split(" - ")[0]) - Number(b.weight.split(" - ")[0])
        ),
      };
    case ORDER_DOGS_WEIGHT_DESC:
      return {
        ...state,
        dogs: [...state.allDogs].sort(
          (a, b) =>
            Number(b.weight.split(" - ")[0]) - Number(a.weight.split(" - ")[0])
        ),
      };
    case FILTER_BY_TEMPERAMENT:
      return {
        ...state,
        dogs: [...state.allDogs].filter((x) => {
          if (x.hasOwnProperty("origin")) {
            console.log("probando");
            if (x.temperament === undefined) return false;
            else return x.temperament.split(", ").includes(payload);
          } else {
            return x.Temperaments.map((x) => x.name).includes(payload);
          }
        }),
      };
    default:
      return state;
  }
};

export default rootReducer;
