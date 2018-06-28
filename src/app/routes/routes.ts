import { LayoutComponent } from "../layout/layout.component";
import { TracingComponent } from "./tracing/tracing.component";
import { RequestComponent } from "./request/request.component";
import { PublishComponent } from "./publish/publish.component";
import { AssignmentComponent } from "./assignment/assignment.component";
import { ActivityComponent } from "./activity/activity.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./pages/register/register.component";
import { AuthguardService }  from '../services/authguard.service';

export const routes = [

    {
        path: '',
        component: LayoutComponent, canActivate: [AuthguardService],
        children: [
            { path: '', redirectTo: 'tracing', pathMatch: 'full' },
            { path: 'tracing', component: TracingComponent },
            { path: 'request', component: RequestComponent },
            { path: 'publish', component: PublishComponent },
            { path: 'assignment', component: AssignmentComponent },
            { path: 'activity', component: ActivityComponent }
        ]            
    },

    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // Not found
    { path: '**', redirectTo: 'tracing' }

];