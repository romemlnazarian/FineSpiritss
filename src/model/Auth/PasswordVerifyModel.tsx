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
      (data, status) => {
        const anyData: any = data;
         if(status === 200){
          callback(anyData);
          return
         }else{
          errorcallback(String(anyData.password[0]));
         }
      },
      '',
      {email, password, password2},
    );
  };
  