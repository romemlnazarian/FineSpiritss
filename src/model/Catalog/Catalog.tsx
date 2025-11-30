import { DELETE, GET } from '../../api/Network';
import { Route } from '../../api/Route';

type AllCategoryItem = {
  id: number;
  cat_name: string;
  cat_slug: string;
  cat_image: string;
  is_parent: boolean;
  children?: AllCategoryItem[];
};

export const getAllCategoriesModel = (
  token: string,
  page: number,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
) => {
  GET(
    Route.root,
    `${Route.all_categories}?page=${page}`,
    (data: {
      detail?: boolean | string;
      message?: string;
      data?: AllCategoryItem[] | any;
      code?: string;
      messages?: any[];
    }) => {
      const anyData: any = data;
      if (anyData && typeof anyData === 'object') {
        // Handle auth/error shapes
        if ('code' in anyData || 'messages' in anyData || typeof anyData.detail === 'string') {
          const msg =
            anyData.code ??
            anyData.detail ??
            anyData?.messages?.[0]?.message ??
            anyData.message ??
            'Unexpected response';
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
        // Pass-through when API doesn't include 'detail'
        callback(anyData);
        return;
      }
      errorcallback('Unexpected response');
    },
    token,
  );
};

export const getCatalogDetailModel = (
  token: string,
  slug: number,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
) => {
  GET(
    Route.root,
    `${Route.categories_children}${slug}/children/`,
    (data: {
      detail?: boolean | string;
      message?: string;
      data?: AllCategoryItem[] | any;
      code?: string;
      messages?: any[];
    }) => {
      const anyData: any = data;
      if (anyData && typeof anyData === 'object') {
        // Handle auth/error shapes
        if ('code' in anyData || 'messages' in anyData || typeof anyData.detail === 'string') {
          const msg =
            anyData.code ??
            anyData.detail ??
            anyData?.messages?.[0]?.message ??
            anyData.message ??
            'Unexpected response';
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
        // Pass-through when API doesn't include 'detail'
        callback(anyData);
        return;
      }
      errorcallback('Unexpected response');
    },
    token,
  );
};

export const getFilterDataModel = (
  token: string,
  slug: number,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
) => {
  GET(
    Route.root,
    `${Route.get_filter_data}${slug}/filters/`,
    (data: {
      detail?: boolean | string;
      message?: string;
      data?: AllCategoryItem[] | any;
      code?: string;
      messages?: any[];
    }) => {
      const anyData: any = data;
      if (anyData && typeof anyData === 'object') {
        // Handle auth/error shapes
        if ('code' in anyData || 'messages' in anyData || typeof anyData.detail === 'string') {
          const msg =
            anyData.code ??
            anyData.detail ??
            anyData?.messages?.[0]?.message ??
            anyData.message ??
            'Unexpected response';
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
        // Pass-through when API doesn't include 'detail'
        callback(anyData);
        return;
      }
      errorcallback('Unexpected response');
    },
    token,
  );
};
export const getFilterProductsModel = (
  token: string,
  slug: number,
  countries: string,
  brands: string,
  volume: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
) => {
  GET(
    Route.root,
    `${Route.filter_products}${slug}/?countries=${countries}&brands=${brands}&volume=${volume}`,
    (data: {
      detail?: boolean | string;
      message?: string;
      data?: AllCategoryItem[] | any;
      code?: string;
      messages?: any[];
    }) => {
      const anyData: any = data;
      if (anyData && typeof anyData === 'object') {
        // Handle auth/error shapes
        if ('code' in anyData || 'messages' in anyData || typeof anyData.detail === 'string') {
          const msg =
            anyData.code ??
            anyData.detail ??
            anyData?.messages?.[0]?.message ??
            anyData.message ??
            'Unexpected response';
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
        // Pass-through when API doesn't include 'detail'
        callback(anyData);
        return;
      }
      errorcallback('Unexpected response');
    },
    token,
  );
};

export const getProductDetailModel = (
  token: string,
  slug: number,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
) => {
  GET(
    Route.root,
    `${Route.product_detail}${slug}`,
    (data: {
      detail?: boolean | string;
      message?: string;
      data?: AllCategoryItem[] | any;
      code?: string;
      messages?: any[];
    }) => {
      const anyData: any = data;
      if (anyData && typeof anyData === 'object') {
        // Handle auth/error shapes
        if ('code' in anyData || 'messages' in anyData || typeof anyData.detail === 'string') {
          const msg =
            anyData.code ??
            anyData.detail ??
            anyData?.messages?.[0]?.message ??
            anyData.message ??
            'Unexpected response';
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
        // Pass-through when API doesn't include 'detail'
        callback(anyData);
        return;
      }
      errorcallback('Unexpected response');
    },
    token,
  );
};

export const getSearchProductsModel = (
  token: string,
  search: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
) => {
  GET(
    Route.root,
    `${Route.search_products}?q=${search}`,
    (data: {
      detail?: boolean | string;
      message?: string;
      data?: AllCategoryItem[] | any;
      code?: string;
      messages?: any[];
    }) => {
      const anyData: any = data;
      if (anyData && typeof anyData === 'object') {
        // Handle auth/error shapes
        if ('code' in anyData || 'messages' in anyData || typeof anyData.detail === 'string') {
          const msg =
            anyData.code ??
            anyData.detail ??
            anyData?.messages?.[0]?.message ??
            anyData.message ??
            'Unexpected response';
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
        // Pass-through when API doesn't include 'detail'
        callback(anyData);
        return;
      }
      errorcallback('Unexpected response');
    },
    token,
  );
};


export const getSearchProductsHistoryModel = (
  token: string,
  search: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
) => {
  GET(
    Route.root,
    `${Route.search_products_history}?q=${search}`,
    (data: {
      detail?: boolean | string;
      message?: string;
      data?: AllCategoryItem[] | any;
      code?: string;
      messages?: any[];
    }) => {
      const anyData: any = data;
      if (anyData && typeof anyData === 'object') {
        // Handle auth/error shapes
        if ('code' in anyData || 'messages' in anyData || typeof anyData.detail === 'string') {
          const msg =
            anyData.code ??
            anyData.detail ??
            anyData?.messages?.[0]?.message ??
            anyData.message ??
            'Unexpected response';
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
        // Pass-through when API doesn't include 'detail'
        callback(anyData);
        return;
      }
      errorcallback('Unexpected response');
    },
    token,
  );
};


export const DeleteSearchProductsHistoryModel = (
  token: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
) => {
  DELETE(
    Route.root,
    `${Route.delete_search_products_history}`,
    (data: {
      detail?: boolean | string;
      message?: string;
      data?: AllCategoryItem[] | any;
      code?: string;
      messages?: any[];
    }) => {
      const anyData: any = data;
      if (anyData && typeof anyData === 'object') {
        // Handle auth/error shapes
        if ('code' in anyData || 'messages' in anyData || typeof anyData.detail === 'string') {
          const msg =
            anyData.code ??
            anyData.detail ??
            anyData?.messages?.[0]?.message ??
            anyData.message ??
            'Unexpected response';
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
        // Pass-through when API doesn't include 'detail'
        callback(anyData);
        return;
      }
      errorcallback('Unexpected response');
    },
    token,
  );
};


export const getRecommendedProductsModel = (
  token: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
  callbackUnauthorized?: () => void,
) => {
  GET(
    Route.root,
    Route.home_recommended,
    (data, status) => {
      if (status === 200) {
        callback(data);
      } else if (status === 401) {
        callbackUnauthorized?.();
      } else {
        errorcallback(data.detail);
      }
    },
    token,
  );
};
