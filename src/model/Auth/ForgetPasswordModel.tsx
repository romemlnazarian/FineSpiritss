import { POST } from "../../api/Network";
import { Route } from "../../api/Route";

type RegisterProps = {
    otp_id: number,
    user_id: number,
    email: string,
    otp_type: string
}

export const ForgetPasswordModel = (
    email: string,
    callback: (data: RegisterProps) => void,
    errorcallback: (data:string) => void,
) =>{
    POST(
        Route.root,
        Route.fotget_password,

        (data, status) => {
          const anyData: any = data;
            if(status === 200){
              callback(anyData);
              return
            }else{
              errorcallback(String(anyData.detail));
            }
        },
      "",
    { email}
      );
}


export const VerifyCodeForgetPasswordModel = (
  email: string,
  verification_code: string,
  callback: (data: RegisterProps) => void,
  errorcallback: (data: string) => void,
) => {
  POST(
    Route.root,
    Route.forgot_password_verify_code,
    (data, status) => {
      const anyData: any = data;
      if (status === 200) {
          callback(anyData);
          return
      } else {
        errorcallback(String(anyData.detail));
      }
    },
    '',
    {email, verification_code},
  );
};

export const ResendOtpForgetPasswordModel = (
  email: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
) => {
  POST(
    Route.root,
    Route.forgot_password_resend_password,
    (data: { detail: boolean; message?: string; data: any }) => {
      const anyData: any = data;
      if (anyData && typeof anyData === 'object' && 'detail' in anyData) {
        if (anyData.detail) {
          callback(anyData.data ?? anyData);
        } else {
          errorcallback(String(anyData.message ?? 'Unexpected response'));
        }
      } else {
        errorcallback('Unexpected response');
      }
    },
    '',
    { email },
  );
};



export const ResetPasswordModel = (
  email: string,
  new_password: string,
  new_password2: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
) => {
  POST(
    Route.root,
    Route.reset_password,
    (data, status) => {
      const anyData: any = data;
      console.log('reset password data====----->',anyData);
       if(status === 200){
        callback(anyData);
        return
       }else{
        errorcallback(anyData);
       }
    },
    '',
    {email, new_password, new_password2},
  );
};
