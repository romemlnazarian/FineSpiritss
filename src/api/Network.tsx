
// Remove useToast from here; instead, accept a showToast function as a parameter
export const errorhandler = (error: any, showToast?: (msg: any) => void) => {
  console.log('errr', error);
  if (showToast) {
    showToast(error);
  }
};

export const POST = (
  root: string,
  controller: string,
  callback: (data: any, status?: number, ok?: boolean) => void,
  secretkey: string = '',
  body: any = ''
) => {
  if (secretkey !== '') {
    fetch(root + controller, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + secretkey,
      },
      body: JSON.stringify(body),
    })
      .then(function (data) {
        const status = data.status;
        const ok = data.ok;
        data.json().then((dd) => {
          callback(dd, status, ok);
        });
      })
      .catch((error) => errorhandler(error));
  } else {
    fetch(root + controller, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(function (data) {
        const status = data.status;
        const ok = data.ok;
        data.json().then((dd) => {
          callback(dd, status, ok);
        });
      })
      .catch((error) => errorhandler(error));
  }
};

export const GET = (
  root: string,
  controller: string,
  callback: (data: any, status?: number, ok?: boolean) => void,
  secretkey: string = '',
) => {
  // console.log("secret", root,controller);
  if (secretkey !== '') {
    fetch(root + controller, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + secretkey,
      },
    })
      .then(function (data) {
        const status = data.status;
        const ok = data.ok;
        data.json().then((dd) => {
          callback(dd, status, ok);
        });
      })
      .catch((error) => errorhandler(error));
  } else {
    fetch(root + controller, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(function (data) {
        const status = data.status;
        const ok = data.ok;
        data.json().then((dd) => {
          callback(dd, status, ok);
        });
      })
      .catch((error) => errorhandler(error));
  }
};

export const PUT = (
  root: string,
  controller: string,
  callback: (data: any, status?: number, ok?: boolean) => void,
  secretkey: string = '',
  lang: string,
  body: any = ''
) => {
  console.warn('=>>>>', body);
  if (secretkey !== '') {
    fetch(root + controller, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + secretkey,
      },
      body: JSON.stringify(body),
    })
      .then(function (data) {
        const status = data.status;
        const ok = data.ok;
        data.json().then((dd) => {
          callback(dd, status, ok);
        });
      })
      .catch((error) => errorhandler(error));
  } else {
    fetch(root + controller, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + secretkey,
        'Accept-Language': lang,
      },
      body: JSON.stringify(body),
    })
      .then(function (data) {
        const status = data.status;
        const ok = data.ok;
        data.json().then((dd) => {
          callback(dd, status, ok);
        });
      })
      .catch((error) => errorhandler(error));
  }
};

export const DELETE = (
  root: string,
  controller: string,
  callback: (data: any, status?: number, ok?: boolean) => void,
  secretkey: string = '',
) => {
  // console.log("secret", root,controller);
  if (secretkey !== '') {
    fetch(root + controller, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // "pastoo_user": user_pastoo,
        Authorization: 'Bearer' + ' ' + secretkey,
      },
    })
      .then(function (data) {
        const status = data.status;
        const ok = data.ok;
        data.json().then((dd) => {
          callback(dd, status, ok);
        });
      })
      .catch((error) => errorhandler(error));
  } else {
    fetch(root + controller, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(function (data) {
        const status = data.status;
        const ok = data.ok;
        data.json().then((dd) => {
          callback(dd, status, ok);
        });
      })
      .catch((error) => errorhandler(error));
  }
};
