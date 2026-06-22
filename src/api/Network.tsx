import useLocalizationStore from '../zustland/localizationStore';

const getAcceptLanguage = (): string => {
  const lang = useLocalizationStore.getState().language?.toLowerCase() ?? 'pl';
  if (lang.startsWith('pl')) {
    return 'pl';
  }
  if (lang.startsWith('en')) {
    return 'en';
  }
  return lang;
};

const buildHeaders = (secretkey: string = ''): Record<string, string> => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': getAcceptLanguage(),
  };

  if (secretkey !== '') {
    headers.Authorization = `Bearer ${secretkey}`;
  }

  return headers;
};

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
      headers: buildHeaders(secretkey),
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
      headers: buildHeaders(),
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
      headers: buildHeaders(secretkey),
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
      headers: buildHeaders(),
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
  body: any = ''
) => {
  console.warn('=>>>>', body);
  if (secretkey !== '') {
    fetch(root + controller, {
      method: 'PUT',
      headers: buildHeaders(secretkey),
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
      headers: buildHeaders(secretkey),
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
  body: any = ''
) => {
  // console.log("secret", root,controller);
  if (secretkey !== '') {
    fetch(root + controller, {
      method: 'DELETE',
      headers: buildHeaders(secretkey),
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
      method: 'DELETE',
      headers: buildHeaders(),
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
