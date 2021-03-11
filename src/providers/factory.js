import jira from './jira';
import github from './github';
import Providers from '../enums/providers';

const getProvider = type => {
  switch (type) {
    case Providers.Jira:
      return jira;
    case Providers.Github:
      return github;
    default:
      throw new Error('Invalid provider');
  }
};

export { getProvider };
