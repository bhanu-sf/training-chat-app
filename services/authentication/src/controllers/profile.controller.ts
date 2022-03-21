import { get } from "@loopback/rest";
import { authorize } from "loopback4-authorization";
import {authenticate, STRATEGY} from 'loopback4-authentication';

// import {inject} from '@loopback/core';


export class ProfileController {
  constructor() {}

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['*']})
  @get('/profile')
  getProfile() {
    return {
      message: 'Profile data'
    }
  }
}
