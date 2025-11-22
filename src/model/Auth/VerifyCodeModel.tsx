import {POST} from '../../api/Network';
import {Route} from '../../api/Route';

type RegisterProps = {
  otp_id: string;
  otp_code: string;
};

export const VerifyCodeModel = (
  email: string,
  verification_code: string,
  callback: (data: RegisterProps) => void,
  errorcallback: (data: string) => void,
) => {
  POST(
    Route.root,
    Route.verify_otp,
    data => {
      const anyData: any = data;
      if (anyData.email) {
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
