import { GET } from '../../api/Network';
import {Route} from '../../api/Route';


type getCategoriesProps = {
    id: number;
    name: string;
    slug: string;
    parent: {
        id: number;
        cat_name: string;
        cat_slug: string;
        cat_image: string;
        is_parent: boolean;
    };
    children: getCategoriesProps[];
}


export const getCategoriesModel =  (
  token: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
) => {
  console.log('tokencalatog =>', token);
  GET(
    Route.root,
    Route.home_categories,
    (data: { detail?: boolean | string; message?: string; data?: getCategoriesProps; code?: string; messages?: any[] }) => {
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
        console.log('anyData =>', anyData);
        callback(anyData);
        return;
      }
      errorcallback('Unexpected response');
    },
    token,
  );
};

export const getTopBrandsModel =  (
  token: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
) => {
  GET(
    Route.root,
    Route.top_brands,
    (data: { detail?: boolean | string; message?: string; data?: getCategoriesProps; code?: string; messages?: any[] }) => {
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

