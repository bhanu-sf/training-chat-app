// Uncomment these imports to begin using these cool features!

import { inject } from "@loopback/core";
import { get, param, post, requestBody } from "@loopback/rest";
import { Auth } from "../services";

export class AuthController {
  constructor(
    @inject('services.Auth')
    private readonly authService: Auth
  ) {}

  @post('/auth/login')
  async login(
    @requestBody() body: any
  ) {
    console.log(this.authService);
    return this.authService.login(body);
  }

  @post('/auth/token')
  async getAuthToken(
    @requestBody() body: any
  ) {
    console.log(this.authService);
    return this.authService.getAuthToken(body);
  }

  @get('/auth/me')
  async getProfile(
    @param.header.string('Authorization') token: string,
  ) {
    return this.authService.getProfile(token);
  }
}
