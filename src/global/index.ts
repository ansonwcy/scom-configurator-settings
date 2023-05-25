export interface IConfig {
  id: number;
  name: string;
  title: string;
  description?: string;
  properties: {[key: string]: any }
}

export * from './utils';