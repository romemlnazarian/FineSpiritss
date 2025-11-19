import { GET } from "../../api/Network";
import { Route } from "../../api/Route";

export const getHomeAdvertisingModel =  (
    token: string,
    callback: (data: any) => void,
    errorcallback: (data: string) => void,
  ) => {
    GET(
      Route.root,
      Route.home_advertising,
      (data: { detail?: boolean | string; message?: string; data?: any; code?: string; messages?: any[] }) => {
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

  export const getHomeBestSalesModel =  (
    token: string,
    callback: (data: any) => void,
    errorcallback: (data: string) => void,
  ) => {
    GET(
      Route.root,
      Route.home_best_sales,
      (data: { detail?: boolean | string; message?: string; data?: any; code?: string; messages?: any[] }) => {
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
  
  export const getHomeNewModel =  (
    token: string,
    callback: (data: any) => void,
    errorcallback: (data: string) => void,
  ) => {
    GET(
      Route.root,
      Route.home_new,
      (data: { detail?: boolean | string; message?: string; data?: any; code?: string; messages?: any[] }) => {
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

  export const getHomeForGiftModel =  (
    token: string,
    callback: (data: any) => void,
    errorcallback: (data: string) => void,
  ) => {
    GET(
      Route.root,
      Route.home_for_gift,
      (data: { detail?: boolean | string; message?: string; data?: any; code?: string; messages?: any[] }) => {
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

  export const getHomeRecommendedModel =  (
    token: string,
    callback: (data: any) => void,
    errorcallback: (data: string) => void,
  ) => {
    GET(
      Route.root,
      Route.home_recommended,
      (data: { detail?: boolean | string; message?: string; data?: any; code?: string; messages?: any[] }) => {
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