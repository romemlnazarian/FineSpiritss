import { DELETE, GET, POST } from "../../api/Network";
import { Route } from "../../api/Route";




export const getSearchProductsHistoryModel = (
    token: string,
    callback: (data: any) => void,
    errorcallback: (data: string) => void,
    callbackUnauthorized?: () => void,
  ) => {
    GET(
      Route.root,
      `${Route.get_favorite_products}`,
      (data, status) => {
           if (status === 200) {
            callback(data.data);
          } else if (status === 401) {
            callbackUnauthorized?.();
          } else {
            errorcallback(data.detail);
          }
        },
        token,
      );
    };
  
    export const AddFavoriteProductModel = (
        token: string,
        product_id: string,
        callback: (data:any) => void,
        errorcallback: (data: string) => void,
        callbackUnauthorized?: () => void,
      ) => {
        POST(
          Route.root,
          `${Route.add_favorite_product}`,
          (data, status) => {
            console.log('data', data, status);
            if (status === 200) {
              callback(data.detail);
            } else if(status === 401) {
              callbackUnauthorized?.();
            } else {
              errorcallback(data.detail);
            }
          },
          token,
          {product_id:product_id},
        );
      };
      





export const DeleteFavoriteProductModel = (
    token: string,
    id: string,
    callback: (data:any) => void,
    errorcallback: (data: string) => void,
    callbackUnauthorized?: () => void,
  ) => {
    DELETE(
      Route.root,
      `${Route.delete_favorite_product}${id}`,
      (data, status) => {
        console.log('data', data, status);
        if (status === 200) {
          callback(data.detail);
        } else if(status === 401) {
          callbackUnauthorized?.();
        } else {
          errorcallback(data.detail);
        }
      },
      token,
    );
  };
  