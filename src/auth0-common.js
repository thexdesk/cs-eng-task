const _ = require('lodash');
/**
 * each attribute on this module gets as input a profile, and returns
 * a value to be used for this attribute, *COMMON* to all the auth0
 * profiles.
 * See `lib/auth/identity-providers/README.txt` for details.
 */
module.exports = profile => ({
  provider: profile.provider,
  auth0Id: profile.id,
  auth0Connection: _.get(profile, 'identities.0.connection'),
  auth0Provider: profile.provider,
  // the next attrs MUST be implemented by providers
  email: undefined,
  username: undefined,
});
