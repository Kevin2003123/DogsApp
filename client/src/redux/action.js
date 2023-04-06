import axios from "axios";
import {
  GET_TEMPERAMENTS,
  GET_DOGS_API_DB,
  GET_DOGS_API,
  GET_DOGS_DB,
  ORDER_DOGS_NAME_ASC,
  ORDER_DOGS_NAME_DESC,
  ORDER_DOGS_WEIGHT_ASC,
  ORDER_DOGS_WEIGHT_DESC,
  FILTER_BY_TEMPERAMENT
} from "./types";

export const getTemperaments = () => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get("http://localhost:3001/temperaments");
      console.log(data);
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const getDogApiDB = () => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(
        "http://localhost:3001/dogs?origin=db+api"
      );
      console.log(data);
      return dispatch({
        type: GET_DOGS_API_DB,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const getDogApi = () => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get("http://localhost:3001/dogs?origin=api");
      console.log(data);
      return dispatch({
        type: GET_DOGS_API,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const getDogDb = () => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get("http://localhost:3001/dogs?origin=db");
      console.log(data);
      return dispatch({
        type: GET_DOGS_DB,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const OrderByName = (order) => {
  if (order === "asc") return { type: ORDER_DOGS_NAME_ASC };
  else return { type: ORDER_DOGS_NAME_DESC };
};

export const OrderByWeight = (order) => {
  if (order === "asc") return { type: ORDER_DOGS_WEIGHT_ASC };
  else return { type: ORDER_DOGS_WEIGHT_DESC };
};


export const filterByTemperament =(temp) =>{
  return {type: FILTER_BY_TEMPERAMENT ,payload: temp};
}
