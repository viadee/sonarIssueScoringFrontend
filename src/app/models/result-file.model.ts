export class ResultFile {
  name: string;
  date: string;
  repository: string;
  result: string;

  constructor(name: string, date: string, repository: string, result: string) {
    this.name = name;
    this.date = date;
    this.repository = repository;
    this.result = result;
  }
}
