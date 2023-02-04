// eslint-disable-next-line import/no-extraneous-dependencies
const Deployer = require('ssh-deploy-release');
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const secretsPath = path.join(__dirname, '..', '..', 'private');

require('dotenv').config({ path: path.join(secretsPath, '.env.hetzner') });

const environment = process.env.USER !== 'deploy' ? 'local' : 'server';
const osEnv = process.env.DEPLOY_TYPE;
const backendPort = osEnv.toLowerCase() === "production" ? "7001" : "6001";
const path_backend = process.env.DEPLOYMENT_PATH_BE+"_"+osEnv;

const excludedFiles = () =>{
  let list = [
    '.git/**', '.git', '.gitignore',
    '.idea', '.idea/**',
    'scripts', 'scripts/**',
    'docs', 'docs/**'
  ];
  /* DON'T upload them, if deploy from server, as they are injected via GITLAB-Variables */
  if(environment === 'server'){
    list.push('.env.hetzner','.env.wwoCredentials', '.env.dealerListCredentials')
  }
  return list;
}

const options = {
  mode: 'synchronize',
  localPath: path.join(__dirname, '..'),
  host: process.env.HOST,
  username: process.env.USERNAME,
  privateKeyFile: path.join(secretsPath, process.env.PRIVATE_KEY_PATH),
  passphrase: process.env.PASS_PHRASE,
  deployPath: path_backend,
  exclude: excludedFiles(),
  currentReleaseLink: process.env.CURRENT_DIR,
  port: process.env.PORT,
  onAfterDeploy: (context)=>{
    /**
     * Example, if you need to copy files from else-where (e.g /private/) to the server.
     * NOTE:
     * There is a bug in ssh-deploy-release : context.remote.update. See here: https://github.com/la-haute-societe/ssh-deploy-release/issues/29
     * You need to use patch-package to fix it as long as the maintainer didn't fix it!
     */
     context.logger.subhead('onAfterDeploy:');
    // context.logger.subhead('Copy .env Files');
    //context.remote.upload(`${secretsPath}/.env.dealerListCredentials`, `${context.release.path}/serverScripts/.env.dealerListCredentials`,(error)=>{error && context.logger.log(error)});
    //context.remote.upload(`${secretsPath}/.env.wwoCredentials`, `${context.release.path}/serverScripts/.env.wwoCredentials`,(error)=>{error && context.logger.log(error)});
    //context.remote.chmod(`${context.release.path}/serverScripts/.env.*`,"700",(error)=>{error && context.logger.log(error)});
    return [
      `pm2 delete ${osEnv} 2>/dev/null || true`,
      `lsof -ti tcp:${backendPort} | xargs kill 2>/dev/null || true`,
      `chmod 700 ${path_backend}/${process.env.CURRENT_DIR}/serverScripts/*`,
      `${path_backend}/${process.env.CURRENT_DIR}/serverScripts/serverScriptPermissions.sh`,
      `pm2 startOrRestart ${path_backend}/${process.env.CURRENT_DIR}/${osEnv}_ecosystem.config.cjs --namespace ${osEnv}`,
    ]
  },
};

const deployer = new Deployer(options);
deployer.deployRelease(() => {
  console.log('Ok !');
});
