import {KeycloakAuthGuardService, keycloakInitializer, KeycloakModule, KeycloakUserService, ValtimoKeycloakOptions} from '@valtimo/keycloak';
import {KeycloakConfig, KeycloakOnLoad} from 'keycloak-js';
import {Injector} from '@angular/core';
import {Auth, AuthProviders} from '@valtimo/config';

const keycloakAuthenticationProviders: AuthProviders = {
  guardServiceProvider: KeycloakAuthGuardService,
  userServiceProvider: KeycloakUserService
};

export const keycloakConfig: KeycloakConfig = {  
  url: window['env']['keycloakUrl'] || 'https://keycloak-nonprod.1smqu2l0aiv58.gzac.cloud',
  realm: window['env']['keycloakRealm'] || 'valtimo-development',
  clientId: window['env']['keycloakClientId'] || 'valtimo-console'
};

const keycloakOnLoad: KeycloakOnLoad = 'login-required';

const keycloakInitOptions: any = {
  config: keycloakConfig,
  onLoad: keycloakOnLoad,
  checkLoginIframe: false,
  flow: 'standard',
  redirectUri: window['env']['keycloakRedirectUri'] || 'https://4200-valtimoclou-valtimoacad-mde7x12w0np.ws-eu101.gitpod.io/keycloak/callback'
};

const valtimoKeycloakOptions: ValtimoKeycloakOptions = {
  keycloakOptions: {
    config: keycloakConfig,
    initOptions: keycloakInitOptions,
    enableBearerInterceptor: true,
    bearerExcludedUrls: [
      '/assets'
    ]
  },
  logoutRedirectUri: window['env']['keycloakLogoutRedirectUri'] || 'https://4200-valtimoclou-valtimoacad-mde7x12w0np.ws-eu101.gitpod.io'
};

export function initializerKeycloak(injector: Injector) {
  return keycloakInitializer(injector);
}

export const authenticationKeycloak: Auth = {
  module: KeycloakModule,
  initializer: initializerKeycloak,
  authProviders: keycloakAuthenticationProviders,
  options: valtimoKeycloakOptions
};
