import * as Jira from '../providers/jira';

const authPermission = async (req, res, next) => {
  if (req.method !== 'OPTIONS') {
    if (!req.header('Authorization')) {
      return res.status(401).send({ message: 'Invalid Token' });
    }

    if (!req.header('Organization-Url')) {
      return res
        .status(401)
        .send({ message: 'Invalid Organization-Url header' });
    }

    const token = req.header('Authorization');
    const baseUrl = req.header('Organization-Url');
    const result = await Jira.hasPermission(token, baseUrl);
    const unauthorizedMsg =
      'Invalid token or user does not belongs to organization';

    if (!result) {
      return res.status(401).send({ message: unauthorizedMsg });
    }
  }

  next();
};

export default authPermission;
