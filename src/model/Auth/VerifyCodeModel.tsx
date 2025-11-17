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
      if (anyData && typeof anyData === 'object' && 'detail' in anyData) {
        if (anyData.detail) {
          callback(anyData);
        } else {
          errorcallback(String(anyData.message ?? anyData.data ?? 'Unexpected response'));
        }
      } else {
        errorcallback('Unexpected response');
      }
    },
    '',
    {email, verification_code},
  );
};
