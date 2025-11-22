import { GET } from "../../api/Network";
import { Route } from "../../api/Route";

 type getProfileProps = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    birthdate: string;
    date_joined: string;
 }


export const getProfileModel =  (
    token: string,
    callback: (data: any) => void,
    errorcallback: (data: string) => void,
  ) => {
    GET(
      Route.root,
      `${Route.get_profile}`,
      (data: { detail?: boolean | string; message?: string; data?: getProfileProps; code?: string; messages?: any[] }) => {
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
  