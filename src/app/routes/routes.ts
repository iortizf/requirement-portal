import { LayoutComponent } from "../layout/layout.component";
import { TracingComponent } from "./tracing/tracing.component";
import { RequestComponent } from "./request/request.component";
import { PublishComponent } from "./publish/publish.component";
import { AssignmentComponent } from "./assignment/assignment.component";
import { ActivityComponent } from "./activity/activity.component";
import { EstatusComponent } from "./estatus/estatus.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./pages/register/register.component";
import { AuthguardService } from '../services/authguard.service';
import { ApplicantInfComponent } from "./request/applicant-inf/applicant-inf.component";
import { RequestInfComponent } from "./request/request-inf/request-inf.component";
import { RequestDescComponent } from "./request/request-desc/request-desc.component";
import { ProyectDescComponent } from "./request/proyect-desc/proyect-desc.component";
import { PublishDocumentComponent } from "./publish/publish-document/publish-document.component";
import { PublishHomeComponent } from "./publish/publish-home/publish-home.component";
import { RoleService } from "../services/role.service";

export const routes = [

    {
        path: '',
        component: LayoutComponent, canActivate: [AuthguardService],
        children: [
            { path: '', redirectTo: 'tracing', pathMatch: 'full' },
            { path: 'tracing', component: TracingComponent, canActivate:[RoleService] },
            {
                path: 'request', component: RequestComponent,
                children: [
                    { path: '', redirectTo: 'applicant-inf', pathMatch: 'full' },
                    { path: 'applicant-inf', component: ApplicantInfComponent },
                    { path: 'request-inf', component: RequestInfComponent },
                    { path: 'request-desc', component: RequestDescComponent },
                    { path: 'proyect-desc', component: ProyectDescComponent }
                ]
            },
            { 
                path: 'publish', component: PublishComponent ,
                children: [
                    { path: '', redirectTo: 'home', pathMatch: 'full' },
                    { path: 'home', component: PublishHomeComponent },
                    { path: 'document', component: PublishDocumentComponent }
                ]
        
            },
            { path: 'assignment', component: AssignmentComponent, canActivate:[RoleService]},
            { path: 'activity', component: ActivityComponent },
            { path: 'estatus', component: EstatusComponent, canActivate:[RoleService]},
            { path: 'publish-document', component: EstatusComponent }
        ]            

    },

    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    

    // Not found
    { path: '**', redirectTo: 'tracing' }

];