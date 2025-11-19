import { POST } from '../../api/Network';
import { Route } from '../../api/Route';

type RegisterProps = {
    email: string,
}

export const Register = (
   email: string,
    full_name: string,
    birthdate: string,
    callback: (data: RegisterProps) => void,
    errorcallback: (data:string) => void,
) =>{
    POST(
        Route.root,
        Route.register,
        (data) => {
          const anyData: any = data;
          if (anyData && typeof anyData === 'object') {
            if ('email' in anyData) {
              if (anyData.detail) {
                callback(anyData);
              } else {
                const msg = anyData?.email?.[0] ?? anyData?.message ?? 'Unexpected response';
                errorcallback(String(msg));
              }
              return;
            }
          }
          errorcallback('Unexpected response');
        },
      '',
    {email: email,full_name: full_name, birthdate: birthdate }
      );
}

