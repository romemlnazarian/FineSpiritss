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
        (data) => {
          const anyData: any = data;
          if (anyData && typeof anyData === 'object') {
            if ('success' in anyData) {
              if (anyData.success === true) {
                callback(anyData.data);
              } else {
                errorcallback(String(anyData.message ?? 'Unexpected response'));
              }
              return;
            }
          }
          errorcallback('Unexpected response');
        },
      "",
    { email}
      );
}

