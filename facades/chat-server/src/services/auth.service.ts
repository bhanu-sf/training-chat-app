import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {AuthServiceDataSource} from '../datasources';

export interface Auth {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.

  login(body: any): Promise<any>;
  getAuthToken(body: any): Promise<any>;
}

export class AuthProvider implements Provider<Auth> {
  constructor(
    // authService must match the name property in the datasource json file
    @inject('datasources.authService')
    protected dataSource: AuthServiceDataSource = new AuthServiceDataSource(),
  ) {}

  value(): Promise<Auth> {
    return getService(this.dataSource);
  }
}
