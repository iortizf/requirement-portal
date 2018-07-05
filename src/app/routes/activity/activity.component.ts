import { Component, OnInit, ChangeDetectionStrategy,ViewChild } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MeetingService } from '../../services/meeting.service';
import { Router} from '@angular/router';
import { Meeting } from '../../shared/meeting.model';
import { stringify } from '@angular/core/src/util';
import { Solicitud } from '../../shared/solicitud.model';





@Component({
  selector: 'app-activity',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  clickedDate: Date;

  newActivityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private meetingService: MeetingService,
    public router: Router
  ) {
    this.newActivityForm = fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  @ViewChild('content') public contentModal;
  public dateSelected: Date;
  public dateString: string;
  public title: string;
  public descripcion: string;

  show(dateSelected:Date,title:string, descripcion:string){
      this.title = title;
      this.descripcion = descripcion;
      this.dateSelected = dateSelected;
      this.contentModal.show();
      this.dateString = dateSelected.toDateString();
  }

  private mdlSampleIsOpen : boolean = false;
  private openModal(open : boolean) : void {
    this.mdlSampleIsOpen = open;
  }


  addMeeting(meeting: Meeting) {
    console.log("Haciendo login");
    console.log("Titulo="+meeting.title+" Descripcion="+meeting.description);
    meeting.firequestid = 6;
    meeting.fimeetingtypeid = 0;
    meeting.ficomplexityid = 0;
    meeting.fiproductid = 0;
    meeting.fipriorityid = 0;
    meeting.fititleinterviewid = 0;
    meeting.fddate = "03/28/2011";
    meeting.fcbusinessengineer = "Paco";
    meeting.fdscheduledate = "03/25/2012";
    meeting.fccomments = "Comments";
    meeting.fcinterviewer = "juan";
    meeting.fibinnaclemeetingid = 3;

    this.meetingService.createMeeting(meeting).subscribe(
      res => {
        this.contentModal.hide();
      },
      err => {
        console.log("Error en login");
        //this.loginError = true;
      }
    );
  }

  ngOnInit() {
    this.meetingService.loadRequest().subscribe(
      res => {
        //console.log( localStorage.getItem("solicitudes") );
        type Solicitudes = Array<Solicitud>;
        var solicitudes:Solicitudes = JSON.parse(localStorage.getItem("solicitudes") );
        console.log("prueba de fuego:"+solicitudes[0].firequestid);
      },
      err => {
        console.log("Error en login");
        //this.loginError = true;
      }
    );

    this.meetingService.getMeetings().subscribe(
      res => {
        //console.log( localStorage.getItem("solicitudes") );
        type Meetings = Array<Meeting>;
        let jsonobject = JSON.stringify(res.body);
        var reuniones:Meetings = JSON.parse(jsonobject) ;
        console.log("MeetingService:"+res);
        console.log("prueba de fuego:"+reuniones[0].fcinterviewer);
      },
      err => {
        console.log("Error en login");
        //this.loginError = true;
      }
    );

  }

  

}
