import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppOptions } from './app.options';
import { NgxConfigureModule, NgxConfigureOptions } from 'ngx-configure';

import { AppComponent } from './app.component';
import { UserDetailsComponent } from './user-details.component';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

const appRoutes: Routes = [

  {
    path: 'userid/:id', component: UserDetailsComponent,
   
  },
  {
  path: 'play', component: UserDetailsComponent
},
{
  path: '', redirectTo: 'userid', pathMatch:'full'
},
];

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxConfigureModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
    //RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: NgxConfigureOptions, useClass: AppOptions },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

