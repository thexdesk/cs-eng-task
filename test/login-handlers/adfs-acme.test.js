const fs = require('fs');
const test = require('tap').test;

const adfsAcme = require('../../src/login-handlers/adfs-acme');
const fixturesDir = __dirname.replace('login-handlers', '') + 'fixtures';
const adfsAcmeProfile = JSON.parse(fs.readFileSync(fixturesDir + '/adfs-acme.json', 'utf8'));
const adfsAcmeProfileSnykAdmin = JSON.parse(fs.readFileSync(fixturesDir + '/adfs-acme-snyk-admin.json', 'utf8'));


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
