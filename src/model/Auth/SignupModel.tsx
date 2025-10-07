import { POST } from "../../api/Network";
import { Route } from "../../api/Route";

type RegisterProps = {
    otp_id: number,
    user_id: number,
    email: string,
    otp_type: string
}

export const Register = (
    username: string,
    email: string,
    birthdate: string,
    callback: (data: RegisterProps) => void,
    errorcallback: (data:string) => void,
) =>{
    POST(
        Route.root,
        Route.register,
        (data) => {
          console.log("gettoken Test >> ", "gettoken",data);
          if (data.success != true) {
            errorcallback(data.message);
            return;
          }
          callback(data.data);
        },
      "",
    {full_name: username, email: email, birthdate: birthdate }
      );
}

