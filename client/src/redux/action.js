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
  FILTER_BY_TEMPERAMENT,
  GET_DOGS_BY_NAME,
  CHANGE_PAGE
} from "./types";

export const getTemperaments = () => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get("http://localhost:3001/temperaments");
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



export const getDogByName = (origin, dogName) => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(`http://localhost:3001/dogs/name?origin=${origin}&dogName=${dogName}`);
      return dispatch({
        type: GET_DOGS_BY_NAME,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error.message);
  }
};


export const changePage = (page) =>{
  return{type: CHANGE_PAGE, payload:page}
}