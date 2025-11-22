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
      data => {
        const anyData: any = data;
        console.log('==>', anyData);
        if (anyData && typeof anyData === 'object' && 'detail' in anyData) {
          if (anyData.detail) {
            callback(anyData);
          } else {
            errorcallback(String(anyData.message ?? 'Unexpected response'));
          }
        } else {
          errorcallback('Unexpected response');
        }
      },
      '',
      {email, password, password2},
    );
  };
  