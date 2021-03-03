import axios from 'axios';

const perPage = 50;
const headers = { headers: {} };

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

  console.log(apiUrl.href);

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

const buidAuthorizationHeader = (currentHeaders, user, token) => {
  const requestHeaders = currentHeaders;
  const userToken = `${user}:${token}`;
  const buff = Buffer.from(userToken);
  const basicToken = buff.toString('base64');

  requestHeaders.headers.Authorization = `Basic ${basicToken}`;

  return requestHeaders;
};

const getProjects = async (user, token, baseUrl) => {
  const requestHeaders = buidAuthorizationHeader(headers, user, token);
  const requestUrl = 'rest/api/3/project/search';
  const url = new URL(requestUrl, baseUrl);
  const mapping = x => ({ id: x.id, key: x.key, name: x.name });

  const result = await getWithPagination(
    url.href,
    requestHeaders,
    0,
    null,
    [],
    mapping
  );

  return result;
};

const getProjectsBoards = async (user, token, baseUrl) => {
  const requestHeaders = buidAuthorizationHeader(headers, user, token);
  const requestUrl = 'rest/agile/1.0/board';
  const url = new URL(requestUrl, baseUrl);
  const mapping = x => ({
    id: x.id,
    name: x.name,
    type: x.type,
    project: {
      id: x.location?.projectId,
      key: x.location?.projectKey,
      name: x.location?.name
    }
  });

  let result = await getWithPagination(
    url.href,
    requestHeaders,
    0,
    null,
    [],
    mapping
  );

  // Return the end result
  result = result.reduce((r, curr) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    const item = (r[curr.project.id] = r[curr.project.id] || {
      id: curr.project.id,
      name: curr.project.name,
      type: curr.project.type,
      boards: []
    });

    item.boards.push({ id: curr.id, name: curr.name, type: curr.type });

    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return r;
  }, {}); // empty object is the initial value for result object

  return result;
};

const hasPermission = async (user, token, baseUrl) => {
  try {
    const requestUrl = '/rest/api/3/permissions';
    const requestHeaders = buidAuthorizationHeader(headers, user, token);
    const url = new URL(requestUrl, baseUrl);
    const result = await axios.get(url.href, requestHeaders);

    return true;
  } catch (err) {
    return false;
  }
};

export default { hasPermission, getProjects, getProjectsBoards };
