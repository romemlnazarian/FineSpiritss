import { Route } from "../../api/Route";
import { GET } from "../../api/Network";
 
export const getCardModel =  (
    token: string,
    callback: (data: any) => void,
    errorcallback: (data: string) => void,
    callbackUnauthorized?: () => void,
  ) => {
    GET(
      Route.root,
      Route.card,
      (data, status) => {
        if (status === 200) {
          callback(data);
        } else if(status === 401) {
          callbackUnauthorized?.();
        } else {
          console.log('log get card',data,status)
          errorcallback('error please try again');
        }
      },
      token,
    );
  };
  