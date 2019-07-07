import { NgxConfigureOptions } from 'ngx-configure';

export class AppOptions extends NgxConfigureOptions {
  ConfigurationURL = 'config/config.json';
  AppVersion = '0.0.0';
  BustCache = true; 
}

/*export const MyRoutes: Routes = [
  { 
    path: '/items/:id', component: MyComponent 
  }
]
*/