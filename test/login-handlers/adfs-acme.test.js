const test = require('tap').test;

const adfsAcme = require('../../src/login-handlers/adfs-acme');
const adfsAcmeProfile = require('../fixtures/adfs-acme.json');
const adfsAcmeProfileSnykAdmin = require('../fixtures/adfs-acme-snyk-admin.json');

test('adfs-acme login strategy - not snyk-admin', t => {
  const result = adfsAcme(adfsAcmeProfile);

  t.equal(result.auth0Provider, 'adfs', 'correct auth0Provider');
  t.equal(result.email, 'Joe.Bloggs@acme.com', 'correct email');
  t.deepEqual(result.addAsGroupAdmin, [], 'not added as group admin');
  t.deepEqual(result.addAsGroupReadOnly, [], 'not added as group read only');
  t.end();
});

test('adfs-acme login strategy - snyk-admin', t => {
  const result = adfsAcme(adfsAcmeProfileSnykAdmin);

  t.equal(result.auth0Provider, 'adfs', 'correct auth0Provider');
  t.equal(result.email, 'Joe.Bloggs@acme.com', 'correct email');
  t.deepEqual(result.addAsGroupAdmin, [ 'acme-group' ], 'added as group admin');
  t.deepEqual(result.addAsGroupReadOnly, [], 'not added as group read only');
  t.end();
});
