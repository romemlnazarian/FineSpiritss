import {POST} from '../../api/Network';
import {Route} from '../../api/Route';

type RegisterProps = {
  detail: string;
  first_name: string;
  last_name: string;
};


type UpdatePasswordProps = {
  old_password: string;
  new_password: string;
  new_password2: string;
};

type UpdateBirthdateProps = {
  birthdate: string;
};

export const UpdateFullNameModel = (
  token: string,
  full_name: string,
  callback: (data: RegisterProps) => void,
  errorcallback: (data: string) => void,
) => {
  POST(
    Route.root,
    Route.update_full_name,
    data => {
      const anyData: any = data;
      if (anyData && typeof anyData === 'object') {
        if ('first_name' in anyData) {
          callback(anyData);
          return;
        }
      }
      errorcallback('Unexpected response');
    },
    token,
    {full_name: full_name},
  );
};


export const UpdatePasswordModel = (
  token: string,
  old_password: string,
  new_password: string,
  new_password2: string,
  callback: (data: UpdatePasswordProps) => void,
  errorcallback: (data: string) => void,
) => {
  POST(
    Route.root,
    Route.update_birthdate,
    data => {
      const anyData: any = data;
      if (anyData.detail) {
        callback(anyData);
      } else if (anyData.old_password) {
        errorcallback(anyData.old_password[0]);
      } else if (anyData.new_password) {
        errorcallback(anyData.new_password[0]);
      }else{
        errorcallback(anyData);
      }
    },
    token,
    {old_password, new_password, new_password2},
  );
};

export const UpdateBirthdateModel = (
  token: string,
  birthdate: string,
  callback: (data: UpdateBirthdateProps) => void,
  errorcallback: (data: string) => void,
) => {
  POST(
    Route.root,
    Route.update_birthdate,
    data => {
      console.log('===------>birdthat',data);
      const anyData: any = data;
      if (anyData.detail) {
        callback(anyData);
      }
      errorcallback(anyData);
    },
    token,
    {birthdate:birthdate},
  );
};
