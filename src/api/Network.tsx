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

const parseResponseJson = async (response: Response) => {
  const text = await response.text();
  if (!text.trim()) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
};

const handleResponse = async (
  response: Response,
  callback: (data: any, status?: number, ok?: boolean) => void,
) => {
  const data = await parseResponseJson(response);
  callback(data, response.status, response.ok);
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
      .then(data => handleResponse(data, callback))
      .catch((error) => errorhandler(error));
  } else {
    fetch(root + controller, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(body),
    })
      .then(data => handleResponse(data, callback))
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
      .then(data => handleResponse(data, callback))
      .catch((error) => errorhandler(error));
  } else {
    fetch(root + controller, {
      method: 'GET',
      headers: buildHeaders(),
    })
      .then(data => handleResponse(data, callback))
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
      .then(data => handleResponse(data, callback))
      .catch((error) => errorhandler(error));
  } else {
    fetch(root + controller, {
      method: 'PUT',
      headers: buildHeaders(secretkey),
      body: JSON.stringify(body),
    })
      .then(data => handleResponse(data, callback))
      .catch((error) => errorhandler(error));
  }
};

export const DELETE = (
  root: string,
  controller: string,
  callback: (data: any, status?: number, ok?: boolean) => void,
  secretkey: string = '',
  body: any = '',
  errorcallback?: (error: any) => void,
) => {
  // console.log("secret", root,controller);
  const hasBody = body !== '';
  const headers = buildHeaders(secretkey);

  if (!hasBody) {
    delete headers['Content-Type'];
  }

  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers,
  };

  if (hasBody) {
    requestOptions.body = JSON.stringify(body);
  }

  if (secretkey !== '') {
    fetch(root + controller, requestOptions)
      .then(data => handleResponse(data, callback))
      .catch((error) => {
        errorhandler(error);
        errorcallback?.(error);
      });
  } else {
    fetch(root + controller, requestOptions)
      .then(data => handleResponse(data, callback))
      .catch((error) => {
        errorhandler(error);
        errorcallback?.(error);
      });
  }
};
