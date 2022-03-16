import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import { AuthDbSourceName } from '@sourceloop/authentication-service';

const config = {
  name: AuthDbSourceName,
  connector: 'postgresql',
  url: 'postgres://admin:password@localhost/users100',
  host: 'localhost',
  port: 5432,
  user: 'admin',
  password: 'password',
  database: 'users100',
  schema: 'main'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AuthDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = AuthDbSourceName;
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.authDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
