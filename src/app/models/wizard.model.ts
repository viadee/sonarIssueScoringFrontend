export interface Wizard {
  url: String,
  user: String,
  branch: String,
  h2o: String,
  port: number,
  horizon: number,
  filenamePrefix: Boolean,
  filenamePostfix: Boolean,
  isPackage: Boolean,
  dependenciesExternal: Boolean,
  dependenciesInternal: Boolean,
  complexity: Boolean,
  lines: Boolean,
  author: Boolean,
  comments: Boolean,
  weekday: Boolean
}
