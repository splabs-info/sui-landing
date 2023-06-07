import { testnet } from './testnet.config';

export const currSdkEnv = 'testnet';

export function buildSdkOptions() {
  switch (currSdkEnv) {
    default:
      return testnet;
  }
}
