import jira from './jira';
import github from './github';

const getProvider = type => {
  switch (type) {
    case 'jira':
      return jira;
    case 'github':
      return github;
    default:
      throw new Error('Invalid provider');
  }
};

export { getProvider };
