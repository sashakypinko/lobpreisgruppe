// eslint-disable-next-line import/no-extraneous-dependencies
const Deployer = require('ssh-deploy-release');
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({ path: path.join(__dirname, '..', '..', 'private', '.env.hetzner') });

let osEnv = process.env.DEPLOY_TYPE;

if(!osEnv){
  console.log("ERROR: Missing Parameter DEPLOY_TYPE!")
  process.exit(1);
}

const sourcePath = `${process.env.DEPLOYMENT_PATH_FE}_${osEnv}/current/.`;
const destPath = osEnv.toLowerCase() === "production" ? process.env.PATH_PROD : process.env.PATH_STAGING;
const options = {
  mode: 'synchronize',
  localPath: path.join(__dirname, '..', 'build'),
  host: process.env.HOST,
  username: process.env.USERNAME,
  privateKeyFile: path.join(__dirname, '..', '..', 'private', process.env.PRIVATE_KEY_PATH),
  passphrase: process.env.PASS_PHRASE,
  deployPath: process.env.DEPLOYMENT_PATH_FE+'_'+osEnv,
  exclude: [],
  currentReleaseLink: process.env.CURRENT_DIR,
  port: process.env.PORT,
  onAfterDeploy: [
    `${destPath}/clearPublicHtml.sh`,
    `cp -r ${sourcePath} ${destPath}/public_html`,
  ],
};

const deployer = new Deployer(options);
deployer.deployRelease(() => {
  console.log('\x1b[32m');
  console.log('Deployment Successful!');
  console.log('\x1b[0m');
});
