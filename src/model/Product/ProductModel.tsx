import { GET } from "../../api/Network";
import { Route } from "../../api/Route";

type getProductsProps = {
    id  : number;
    title: string;
    slug: string;
    price: string;
    regular_price: string;
    sale_price: string | null;
    country: string;
    abv: string;
    volume: string;
    image_url: string;
}

export const getProductsModel =  (
    token: string,
    slug: string,
    page: number,
    callback: (data: any) => void,
    errorcallback: (data: string) => void,
  ) => {
    GET(
      Route.root,
      `${Route.get_products}${slug}/?page=${page}`,
      (data: { detail?: boolean | string; message?: string; data?: getProductsProps; code?: string; messages?: any[] }) => {
        const anyData: any = data;
        if (anyData && typeof anyData === 'object') {
          if ('code' in anyData || 'messages' in anyData || typeof anyData.detail === 'string') {
            const msg = anyData.code ?? anyData.detail ?? anyData?.messages?.[0]?.message ?? anyData.message ?? 'Unexpected response';
            errorcallback(String(msg));
            return;
          }
          if ('detail' in anyData) {
            if (anyData.detail === true) {
              callback(anyData.data ?? anyData);
            } else {
              errorcallback(String(anyData.message ?? 'Unexpected response'));
            }
            return;
          }
          callback(anyData);
          return;
        }
        errorcallback('Unexpected response');
      },
      token
    );
  };
  