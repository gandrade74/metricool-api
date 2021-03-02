import { createBase } from './baseRepository';

const createProject = async (data, organizationId) => {
  const dataMapping = x => [x.name, x.description, x.url, x.id, organizationId];

  const query =
    'insert into projects (name, description, url, original_id, organization_id) values values %';

  await createBase(data, query, dataMapping);
};

export { createProject };
