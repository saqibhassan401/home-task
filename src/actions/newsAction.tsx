import { FETCH_NEWS } from "../actionTypes/actionTypes";

const addNews =  (data:any) => {

    return {
      type: FETCH_NEWS,
      data: data
      };
};

export { addNews };