 interface RouteObj {
  // root: string;
  root: string;
  register: string;
  verify_otp: string;
  resend_otp: string;
  set_password: string;


}

export const Route: RouteObj = {
    root: "https://insureautosafe.com/wp-json/mobile/v1/",
    register: "auth/register",
    verify_otp: "auth/verify-otp",
    resend_otp: "auth/resend-otp",
    set_password: "auth/set-password",
};