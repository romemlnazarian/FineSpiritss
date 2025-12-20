import { DELETE, GET, POST, PUT } from "../../api/Network";
import { Route } from "../../api/Route";

type addCardProps = {
    product_id: number;
}
type updateCardProps = {
  product_id: number;
  quantity: number;
}
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
        errorcallback('error please try again');
      }
    },
    token,
  );
};


export const addCardModel =  (
    token: string,
    product_id: number,
    callback: (data: any) => void,
    errorcallback: (data: string) => void,
    callbackUnauthorized?: () => void,
  ) => {
    POST(
      Route.root,
      Route.card,
      (data, status) => {
        console.log('log add card',data,status)
        if (status === 200) {
          callback(data);
        } else if(status === 401) {
          callbackUnauthorized?.();
        } else {
          errorcallback('error please try again');
        }
      },
      token,
     {
        product_id: product_id
     }
    );
  };
  

  export const updateCardModel =  (
    token: string,
    product_id: number,
    quantity: number,
    callback: (data: any) => void,
    errorcallback: (data: string) => void,
    callbackUnauthorized?: () => void,
  ) => {
    PUT(
      Route.root,
      Route.card,
      (data, status) => {
        console.log('log update card',data, quantity ,status)
        if (status === 200) {
          callback(data);
        } else if(status === 401) {
          callbackUnauthorized?.();
        } else {
          errorcallback('error please try again');
        }
      },
      token,
     {
        product_id:product_id,
        quantity:quantity
     }
    );
  };



  export const deleteCardModel =  (
    token: string,
    product_id: number,
    callback: (data: any) => void,
    errorcallback: (data: string) => void,
    callbackUnauthorized?: () => void,
  ) => {
    DELETE(
      Route.root,
      Route.card,
      (data, status) => {
        console.log('log delete card',data,status)
        if (status === 200) {
          callback(data);
        } else if(status === 401) {
          callbackUnauthorized?.();
        } else {
          errorcallback('error please try again');
        }
      },
      token,
      {
        product_id:product_id
      }
    );
  };
