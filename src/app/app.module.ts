import { BrowserModule } from '@angular/platform-browser';
import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule }    from '@angular/common/http';
import { routes } from "./routes/routes";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CalendarModule } from 'angular-calendar';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { ActivityComponent } from './routes/activity/activity.component';
import { AssignmentComponent } from './routes/assignment/assignment.component';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/pages/login/login.component';
import { PublishComponent } from './routes/publish/publish.component';
import { RequestComponent } from './routes/request/request.component';
import { TracingComponent } from './routes/tracing/tracing.component';
import { RegisterComponent } from './routes/pages/register/register.component';
import { FooterComponent } from './layout/footer/footer.component';
import { EstatusComponent } from './routes/estatus/estatus.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    ActivityComponent,
    AssignmentComponent,
    HomeComponent,
    LoginComponent,
    PublishComponent,
    RequestComponent,
    TracingComponent,
    RegisterComponent,
    FooterComponent,
    EstatusComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgxDatatableModule,
    RouterModule.forRoot(routes),
    MDBBootstrapModule.forRoot(),
    CalendarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
