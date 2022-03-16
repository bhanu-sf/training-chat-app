import {Provider} from '@loopback/core';
import { SignupTokenHandlerFn } from '@sourceloop/authentication-service';


export class SignupTokenHandlerProvider
  implements Provider<SignupTokenHandlerFn>
{
  value(): SignupTokenHandlerFn {
    return async dto => {
      console.log(dto);
    };
  }
}
