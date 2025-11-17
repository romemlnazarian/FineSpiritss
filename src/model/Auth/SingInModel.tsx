import {POST} from '../../api/Network';
import {Route} from '../../api/Route';

type SingInProps = {

    access: string,
    refresh: string,

};

export const SingInModel = (
  email: string,
  password: string,
  callback: (data: SingInProps) => void,
  errorcallback: (data: string) => void,
) => {
  POST(
    Route.root,
    Route.login ,
    data => {
      const anyData: any = data;
      if (anyData && typeof anyData === 'object' && 'access' in anyData && 'refresh' in anyData) {
        callback(anyData as SingInProps);
      } else if (anyData && typeof anyData === 'object' && 'detail' in anyData) {
        errorcallback(String(anyData.detail));
      } else {
        errorcallback('Unexpected response');
      }
    },
    '',
    {email, password},
  );
};
