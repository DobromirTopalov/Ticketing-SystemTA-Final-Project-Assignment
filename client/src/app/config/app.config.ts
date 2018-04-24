export class AppConfig {
  readonly apiUrl: string;
  readonly jwt_issuer: string;

  constructor() {
    this.apiUrl = 'http://localhost:3200/api';
    this.jwt_issuer = 'telerik';
  }

}
