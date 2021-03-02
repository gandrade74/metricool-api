import axios from 'axios';

const perPage = 50;

const getWithPagination = async (
  url,
  requestConfig,
  startAt,
  total,
  resultData,
  resultMap
) => {
  const apiUrl = new URL(url);
  apiUrl.searchParams.append('startAt', startAt);

  const result = await axios.get(apiUrl.href, requestConfig);

  const resultMapped = result.data.values.map(x => resultMap(x));
  const resultDataMapped = [].concat(resultData, resultMapped);

  if (result.data.isLast) {
    return resultDataMapped;
  }

  return getWithPagination(
    url,
    requestConfig,
    startAt + perPage,
    total,
    resultDataMapped,
    resultMap
  );
};

const buildRequestConfig = (authorizationValue, acceptValue) => {
  const requestConfig = { headers: {} };

  if (authorizationValue) {
    requestConfig.headers.Authorization = authorizationValue;
  }

  if (acceptValue) {
    requestConfig.headers.Accept = acceptValue;
  }

  return requestConfig;
};

const getProjects = async (token, baseUrl) => {
  const requestConfig = buildRequestConfig(token);
  const requestUrl = 'rest/api/3/project/search';
  const url = new URL(requestUrl, baseUrl);
  const mapping = x => ({ id: x.id, key: x.key, name: x.name });

  const result = await getWithPagination(
    url.href,
    requestConfig,
    0,
    null,
    [],
    mapping
  );

  return result;
};

const getProject = () => {};

const hasPermission = async (token, baseUrl) => {
  try {
    const requestUrl = '/rest/api/3/permissions';
    const requestConfig = buildRequestConfig(token);
    const url = new URL(requestUrl, baseUrl);
    const result = await axios.get(url.href, requestConfig);

    return true;
  } catch (err) {
    return false;
  }
};

export { getProject, getProjects, hasPermission };
