#!/usr/bin/env node
/* eslint-disable no-console */
const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const keystore = path.join(root, 'android/app/debug.keystore');
const googleServicesPath = path.join(root, 'android/app/google-services.json');

function getSha() {
  try {
    const out = execSync(
      `keytool -list -v -keystore "${keystore}" -alias androiddebugkey -storepass android -keypass android`,
      {encoding: 'utf8'},
    );
    const sha1 = (out.match(/SHA1:\s*(.+)/) || [])[1]?.trim();
    const sha256 = (out.match(/SHA256:\s*(.+)/) || [])[1]?.trim();
    return {sha1, sha256};
  } catch (error) {
    return {sha1: null, sha256: null, error: String(error.message || error)};
  }
}

function readGoogleServices() {
  try {
    const raw = fs.readFileSync(googleServicesPath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function findWebClientId(googleServices) {
  const clients = googleServices?.client?.[0]?.oauth_client ?? [];
  const webClient = clients.find(c => c.client_type === 3);
  return webClient?.client_id ?? null;
}

const {sha1, sha256, error} = getSha();
const googleServices = readGoogleServices();
const webClientId = findWebClientId(googleServices);
const oauthClients = googleServices?.client?.[0]?.oauth_client ?? [];
const projectId = googleServices?.project_info?.project_id ?? 'unknown';

console.log('\n=== Google Sign-In Android setup ===\n');
console.log(`Firebase Android project: ${projectId}`);
console.log(`Package name: com.finespirits`);
console.log(`google-services.json: ${googleServicesPath}\n`);

if (error) {
  console.log('Could not read debug keystore:', error);
} else {
  console.log('Debug SHA fingerprints (add both in Firebase Console):');
  console.log(`  SHA-1:   ${sha1}`);
  console.log(`  SHA-256: ${sha256}\n`);
}

if (!oauthClients.length) {
  console.log('Problem: oauth_client is EMPTY in google-services.json');
  console.log('This causes DEVELOPER_ERROR (code 10) on Google Sign-In.\n');
  console.log('Fix steps:');
  console.log('1. Firebase Console -> Project finespirits-6bf74');
  console.log('2. Project settings -> Your apps -> Android com.finespirits');
  console.log('3. Add SHA-1 and SHA-256 from above');
  console.log('4. Download new google-services.json -> android/app/google-services.json');
  console.log('5. Run this script again to get Web client ID');
  console.log('6. Put Web client ID in src/config/googleSignIn.ts -> GOOGLE_WEB_CLIENT_ID');
  console.log('7. Rebuild app: npm run android\n');
} else if (webClientId) {
  console.log('Web client ID found in google-services.json:');
  console.log(`  ${webClientId}\n`);
  console.log('Put this value in src/config/googleSignIn.ts -> GOOGLE_WEB_CLIENT_ID\n');
} else {
  console.log('oauth_client exists but no Web client (type 3) found.');
  console.log('Enable Google Sign-In in Firebase Authentication and re-download google-services.json.\n');
}

console.log('Current src/config/googleSignIn.ts must use Android Web client ID,');
console.log('NOT the iOS Firebase client IDs (542974643494-...).\n');
