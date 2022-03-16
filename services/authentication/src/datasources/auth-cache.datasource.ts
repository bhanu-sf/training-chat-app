import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import { AuthCacheSourceName } from '@sourceloop/authentication-service';

const config = {
  name: AuthCacheSourceName,
  connector: 'postgresql',
  url: 'postgres://admin:password@localhost/auth_cache',
  host: 'localhost',
  port: 5432,
  user: 'admin',
  password: 'password',
  database: 'auth_cache',
  schema: 'public'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AuthCacheDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = AuthCacheSourceName;
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.authCache', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
