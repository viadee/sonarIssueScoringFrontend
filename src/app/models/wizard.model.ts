export class Wizard {

  url: string;
  user: string;
  branch: string;
  h2o: string;
  port: number;
  horizon: number;
  filenamePrefix: boolean;
  filenamePostfix: boolean;
  isPackage: boolean;
  dependenciesExternal: boolean;
  dependenciesInternal: boolean;
  complexity: boolean;
  lines: boolean;
  author: boolean;
  comments: boolean;
  weekday: boolean;

  constructor(url: string, user: string, branch: string, h2o: string, port: number, horizon: number,
              filenamePrefix: boolean, filenamePostfix: boolean, isPackage: boolean, dependenciesExternal: boolean,
              dependenciesInternal: boolean, complexity: boolean, lines: boolean, author: boolean, comments: boolean, weekday: boolean) {
    this.url = url;
    this.user = user;
    this.branch = branch;
    this.h2o = h2o;
    this.port = port;
    this.horizon = horizon;
    this.filenamePrefix = filenamePrefix;
    this.filenamePostfix = filenamePostfix;
    this.isPackage = isPackage;
    this.dependenciesExternal = dependenciesExternal;
    this.dependenciesInternal = dependenciesInternal;
    this.complexity = complexity;
    this.lines = lines;
    this.author = author;
    this.comments = comments;
    this.weekday = weekday;
  }
}
