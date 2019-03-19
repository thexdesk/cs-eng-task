const _ = require('lodash');
const auth0Common = require('../auth0-common');

module.exports = profile => {
  const addAsGroupAdmin = [];
  const addAsGroupReadOnly = [];

  const groupId = 'acme-group';

  const profileGroups = _.get(profile, '_json.groups', []);

  // authorization based on SAML attributes
  if (profileGroups.includes('snyk-admin')) {
    addAsGroupAdmin.push(groupId);
  }

  return {
    ...auth0Common(profile),

    // basic info from the profile
    email: _.get(profile, '_json.email'),
    name: profile.displayName,
    username: profile.nickname,

    addAsGroupAdmin,
    addAsGroupReadOnly,
  };
};
