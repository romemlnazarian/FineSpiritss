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
  search_products: string;
  search_products_history: string;
  delete_search_products_history: string;
  home_advertising: string;
  home_best_sales: string;
  home_new: string;
  home_for_gift: string;
  home_recommended: string;
  get_profile: string;
  update_full_name: string;
  update_password: string;
  update_birthdate: string;
  change_email: string;
  verify_email: string;
  delete_account: string;
  delete_account_verify: string;
  get_favorite_products: string;
  add_favorite_product: string;
  delete_favorite_product: string;
  get_support: string;
}

export const Route: RouteObj = {
  root:'https://api.finespirits.pl/api/',
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
    search_products: 'product/products/search/product/',
    search_products_history: 'product/search/history/',
    delete_search_products_history: 'product/search/history/',
    home_advertising:'product/home-advertising/',
    home_best_sales:'product/best-sales/',
    home_new:'product/new/',
    home_for_gift:'product/for-gift/',
    home_recommended:'product/recommended/',
    get_profile: 'auth/profile/',
    update_full_name: 'auth/change-name/',
    update_password: 'auth/change-password/',
    update_birthdate: 'auth/change-birthdate/',
    change_email: 'auth/change-email/',
    verify_email: 'auth/verify-email-change/',
    delete_account: 'auth/delete-account/',
    delete_account_verify: 'auth/confirm-deletion/',
    get_favorite_products: 'product/favorites/',
    add_favorite_product: 'product/favorites/add/',
    delete_favorite_product: 'product/favorites/remove/',
    get_support: 'support/about-company/',
};