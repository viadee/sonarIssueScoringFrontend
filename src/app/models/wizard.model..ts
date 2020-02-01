export interface Wizard {
  url: string;
  user: string;
  branch: string;
  h2o: string;
  port: number;
  horizon: number;
  filenamePrefix: boolean;
  filenamePostfix: boolean;
  package: boolean;
  dependenciesExternal: boolean;
  dependenciesInternal: boolean;
  complexity: boolean;
  lines: boolean;
  author: boolean;
  comments: boolean;
  weekday: boolean;
}
