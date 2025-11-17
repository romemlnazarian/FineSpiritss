 interface RouteObj {
  // root: string;
  root: string;
  register: string;
  verify_otp: string;
  resend_otp: string;
  set_password: string;
  login: string;
  fotget_password: string;
  home_categories: string;
  top_brands: string;
  all_categories: string;
  categories_children: string;
  refresh_token: string;
  get_products: string;
  get_filter_data: string;
  filter_products: string;
  product_detail: string;
}

export const Route: RouteObj = {
  root:'https://finespirit-565506410896.europe-west3.run.app/api/',
    // root: "https://insureautosafe.com/wp-json/mobile/v1/",
    register: 'auth/registration/',
    verify_otp: 'auth/registration/verify-email/',
    resend_otp: 'auth/registration/resend-code/',
    set_password: 'auth/registration/set-password/',
    login: 'auth/token/',
    fotget_password: 'auth/forgot-password',
    home_categories: 'product/categories/home/',
    top_brands: 'product/brands/top/',
    all_categories: 'product/categories/all/',
    categories_children:'product/categories/slug/',
    refresh_token:'auth/token/refresh/',
    get_products: 'product/products/category/',
    get_filter_data: 'product/products/category/',
    filter_products: 'product/products/category/',
    product_detail: 'product/products/',
};