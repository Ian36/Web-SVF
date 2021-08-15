import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SvfComponent } from './svf/svf.component';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { WebSvfComponent } from './web-svf/web-svf.component';
import { InputComponent } from './input/input.component';
import { OutputComponent } from './output/output.component';
import { GraphsComponent } from './graphs/graphs.component';

import { AngularSplitModule } from 'angular-split';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectoryComponent } from './directory/directory.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SvfComponent,
    WebSvfComponent,
    InputComponent,
    OutputComponent,
    GraphsComponent,
    ToolbarComponent,
    DirectoryComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'websvf', component: WebSvfComponent, pathMatch: 'full' },
      { path: 'svf', component: SvfComponent, pathMatch: 'full' },
    ]),
    CodemirrorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTabsModule,
    AngularSplitModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
