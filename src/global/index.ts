export interface IConfig {
  id: number;
  path: string;
  title: string;
  description?: string;
  properties: {[key: string]: any }
}

export interface ISaveConfigData {
  path: string;
  properties: any;
  tag: any;
}

export * from './utils';