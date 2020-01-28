import fs from 'fs';
import os from 'os';

/**
 * 
 * @param s environment file content (eg: .env, dev.env, prod.env, ...)
 * @param startWith object to augment environment with (used to aggregate multiple envs)
 */
function parseEnv(s: string, startWith: any = {}) {
  /**
   * Used to not care about platform specific encoding
   */
  const eol = os.EOL;
  const char = '=';
  /**
   * Aggregator function
   * 
   * `values` is join in case their is multiple `char` occurencies in the environment entry 
   */
  const reduceFn = (env: any, [key, ...values]: string[]) => ({
    ...env,
    [key]: values.join(char)
  });
  return s.split(eol)
    .filter(line => !!line)
    .map(line => line.split(char))
    .reduce(reduceFn, startWith);
}

/**
 * MUST be sybiling of environment files
 */
function environ() {
    const envBasePath = `${__dirname}/.env`;
    const envStr = fs.readFileSync(envBasePath, 'utf8');
    const envContent: any = parseEnv(envStr);
    /**
     * Grab the TARGET entry
     */
    const { TARGET } = envContent;
    let targetEnvContent: any = {};
    if (TARGET !== undefined) {
      const targetEnvBasePath = `${__dirname}/${TARGET}.env`;
      const targetEnvStr = fs.readFileSync(targetEnvBasePath, 'utf8');
      targetEnvContent = parseEnv(targetEnvStr, envContent);
    }
    process.env = { ...process.env, ...targetEnvContent };
    return targetEnvContent;
}

let env: any;

/**
 * Singleton export
 */
export default (function () {
  return !env ? (env = environ()) : env;
})();
