import {GET, POST, PUT} from '../../api/Network';
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

type ChangeEmailProps = {
  email: string;
};


type AddressProps = {
  street: string,
  postal_code:string,
  city: string,
  phone: string
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
    Route.update_password,
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

export const ChangeEmailModel = (
  token: string,
  email: string,
  callback: (data: string) => void,
  errorcallback: (data: string) => void,
) => {
  POST(
    Route.root,
    Route.change_email,
    (data, status) => {
      if (status === 200) {
        callback(data.detail);
      } else {
        errorcallback(data.new_email[0]);
      }
    },
    token,
    {new_email:email},
  );
};


export const VerifyEmailModel = (
  token: string,
  code: string,
  callback: (data: string) => void,
  errorcallback: (data: string) => void,
) => {
  POST(
    Route.root,
    Route.verify_email,
    (data, status) => {
      if (status === 200) {
        callback(data.detail);
      } else {
        errorcallback(data.detail);
      }
    },
    token,
    {verification_code:code},
  );
};

export const DeleteAccountModel = (
  token: string,
  reason: string,
  callback: (data: string) => void,
  errorcallback: (data: string) => void,
) => {
  POST(
    Route.root,
    Route.delete_account,
    (data, status) => {
      if (status === 200) {
        callback(data.detail);
      } else {
        errorcallback(data.detail);
      }
    },
    token,
    {reason:reason},
  );
};

export const DeleteAccountVerifyModel = (
  token: string,
  deletion_code: string,
  reason: string,
  callback: (data: string) => void,
  errorcallback: (data: string) => void,
  callbackUnauthorized: () => void,
) => {
  POST(
    Route.root,
    Route.delete_account_verify,
    (data, status) => {
      if (status === 200) {
        callback(data.detail);
      } else if(status === 401) {
        callbackUnauthorized();
      } else {
        errorcallback(data.detail);
      }
    },
    token,
    {deletion_code:deletion_code,reason:reason},
  );
};


export const getSupportModel =  (
  token: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
  callbackUnauthorized?: () => void,
) => {
  GET(
    Route.root,
    Route.get_support,
    (data, status) => {
      if (status === 200) {
        callback(data);
      } else if(status === 401) {
        callbackUnauthorized?.();
      } else {
        errorcallback(data.detail);
      }
    },
    token
  );
};

export const getAddressModel =  (
  token: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
  callbackUnauthorized?: () => void,
) => {
  GET(
    Route.root,
    Route.create_address,
    (data, status) => {
      if (status === 200) {
        callback(data);
      } else if(status === 401) {
        callbackUnauthorized?.();
      } else {
        errorcallback(data.detail);
      }
    },
    token,
  );
};


export const addAddressModel =  (
  token: string,
  data:AddressProps,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
  callbackUnauthorized?: () => void,
) => {
  console.log('===>',data,token)
  POST(
    Route.root,
    Route.create_address,
    (data, status) => {
      if (status === 201) {
        callback(data);
      } else if(status === 401) {
        callbackUnauthorized?.();
      } else {
        errorcallback(data.detail);
      }
    },
    token,
   {
    street: data.street,
    postal_code: data.postal_code,
    city: data.city,
    phone: data.phone
   }
  );
};



export const updateAddressModel =  (
  token: string,
  data:AddressProps,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
  callbackUnauthorized?: () => void,
) => {
  PUT(
    Route.root,
    Route.create_address,
    (data, status) => {
      if (status === 200) {
        callback(data);
      } else if(status === 401) {
        callbackUnauthorized?.();
      } else {
        errorcallback(data.detail);
      }
    },
    token,
   {
    street: data.street,
    postal_code: data.postal_code,
    city: data.city,
    phone: data.phone
   }
  );
};


export const getOrderHistoryModel =  (
  token: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
  callbackUnauthorized?: () => void,
) => {
  GET(
    Route.root,
    `${Route.order_history}`,
    (data, status) => {
      if (status === 200) {
        callback(data);
      } else if(status === 401) {
        callbackUnauthorized?.();
      } else {
        errorcallback(data.detail);
      }
    },
    token,
  );
};
export const getOrderHistoryDetailModel =  (
  token: string,
  id:number,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
  callbackUnauthorized?: () => void,
) => {
  GET(
    Route.root,
    `${Route.order_history}${id}/`,
    (data, status) => {
      if (status === 200) {
        callback(data);
      } else if(status === 401) {
        callbackUnauthorized?.();
      } else {
        errorcallback(data.detail);
      }
    },
    token,
  );
};
