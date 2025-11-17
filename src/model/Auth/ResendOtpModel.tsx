import { POST } from '../../api/Network';
import { Route } from '../../api/Route';

export const ResendOtpModel = (
  email: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
) => {
  POST(
    Route.root,
    Route.resend_otp,
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


