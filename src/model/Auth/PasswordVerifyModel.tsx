import { POST } from "../../api/Network";
import { Route } from "../../api/Route";

type PasswordVerifyProps = {

      user: {
          id: number,
          email: string,
          first_name: string,
          last_name: string,
          phone: string,
          birthdate: string,
          billing_address: {
              postcode: string,
              city: string,
              address: string,
              apartment: string
          }
      },
      tokens: {
          access_token: string,
          refresh_token: string,
          expires_in: number,
          token_type: string
      }

}

const extractErrorMessage = (data: any): string => {
  if (!data) return 'Something went wrong';
  if (typeof data === 'string') return data;

  const anyData: any = data;
  if (anyData?.detail) return String(anyData.detail);
  if (anyData?.message) return String(anyData.message);

  const pickFirst = (v: any) => (Array.isArray(v) ? v[0] : v);
  const passwordMsg = pickFirst(anyData?.password);
  if (passwordMsg) return String(passwordMsg);
  const password2Msg = pickFirst(anyData?.password2);
  if (password2Msg) return String(password2Msg);
  const nonField = pickFirst(anyData?.non_field_errors);
  if (nonField) return String(nonField);

  return 'Password does not meet requirements';
};

  export const PasswordVerifyModel = (
    email: string,
    password: string,
    password2: string,
    callback: (data: PasswordVerifyProps) => void,
    errorcallback: (data: string) => void,
  ) => {
    POST(
      Route.root,
      Route.set_password,
      (data, status) => {
        const anyData: any = data;
         if(status === 200){
          callback(anyData);
          return
         }
         errorcallback(extractErrorMessage(anyData));
      },
      '',
      {email, password, password2},
    );
  };
  