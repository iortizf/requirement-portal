import { Component, OnInit, ChangeDetectionStrategy,ViewChild,
  TemplateRef } from '@angular/core';
import { CalendarEvent,
  CalendarEventTimesChangedEvent } from 'angular-calendar';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MeetingService } from '../../services/meeting.service';
import { Router} from '@angular/router';
import { Meeting } from '../../shared/meeting.model';
import { stringify } from '@angular/core/src/util';
import { Solicitud } from '../../shared/solicitud.model';
import { DatePipe } from '@angular/common';
import { colors } from './colors';
import { addDays, startOfDay, endOfDay } from 'date-fns';
import { Subject } from 'rxjs';


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

  @ViewChild('frame') frameModal;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  clickedDate: Date;

  newActivityForm: FormGroup;

  solicitudes = new Array<Solicitud>();

  datepipe = new DatePipe('en-US'); 

  reuniones = new Array<Meeting>();

  constructor(
    private fb: FormBuilder,
    private meetingService: MeetingService,
    public router: Router
  ) {
    this.newActivityForm = fb.group({
      title: [null, Validators.required],
      fccomments: [null, Validators.required],
      firequestid: [null, Validators.required],
      fcinterviewer: [null, Validators.required],
      fdfinaldate: [null, Validators.required],
      fibinnaclemeetingid:[null, Validators.required],
    });
  }

  @ViewChild('content') public contentModal;
  public dateSelected: Date;
  public dateString: string;
  public title: string;
  public descripcion: string;

  show(dateSelected:Date,title:string, descripcion:string){
      this.newActivityForm.reset();
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

    const now = Date.now();
    
    var date = new Date().toDateString();
    
    let latest_date =this.datepipe.transform(date, 'MM/dd/yyyy');

    let solicitud = this.solicitudes.find(sol=>sol.firequestid == meeting.firequestid);

    meeting.fddate = latest_date;
    meeting.fcbusinessengineer = solicitud.fcbusisnessengineer;
    meeting.fdscheduledate = this.datepipe.transform(this.dateString,'MM/dd/yyyy');
    meeting.fibinnaclemeetingid = 3;

    if(meeting.fibinnaclemeetingid != null){
      console.log("Modificar");
      this.meetingService.updateMeeting(meeting).subscribe(
        res => {
          this.contentModal.hide();
        },
        err => {
          console.log("Error en login");
        }
      );
    }else{
      console.log("Agregar");
      this.meetingService.createMeeting(meeting).subscribe(
        res => {
          this.contentModal.hide();
        },
        err => {
          console.log("Error en login");
        }
      );
    }

  }

  ngOnInit() {
    this.meetingService.loadRequest().subscribe(
      res => {
        //console.log( localStorage.getItem("solicitudes") );
        //type Solicitudes = Array<Solicitud>;
        this.solicitudes = JSON.parse(localStorage.getItem("solicitudes") );
        console.log("prueba de fuego:"+this.solicitudes[0].firequestid);
      },
      err => {
        console.log("Error en login");
        //this.loginError = true;
      }
    );
 
    this.meetingService.getMeetings().subscribe(
      res => {
        //console.log( localStorage.getItem("solicitudes") );
        this.reuniones = res;
        var obj: Array<any> = [];
        this.reuniones.forEach(element => {
         
          obj.push({
            title: element.fccomments,
            color: colors.yellow, 
            start: new Date(element.fdscheduledate),
            id: element.fibinnaclemeetingid
          })
          // console.log("Reunion "+element.fibinnaclemeetingid+"*"+
          // new Date(element.fdscheduledate)+element.fdscheduledate);
          // console.log("es");
        });
        
        this.events = obj;
        //this.refresh.next();

        console.log("MeetingService:"+res);
        //console.log("prueba de fuego:"+new Date(reuniones[0].fdscheduledate));
        
      },
      err => {
        console.log("Error en login");
        //this.loginError = true;
      }
    );

    //this.newActivityForm.patchValue({fccomments:"Comentarios"});

  }

  get f(){return this.newActivityForm.controls;}
  
  handleEvent(action: string, event: CalendarEvent): void {
    //this.modalData = { event, action };
    
    //this.frameModal.show();

    this.title = "Actividad";
    this.descripcion = "Descripcion";
    this.dateSelected = event.start;
    this.contentModal.show();
    this.dateString = event.start.toDateString();

    var reunionModificada: Meeting;
    reunionModificada = this.reuniones.
          filter(reunion => reunion.fibinnaclemeetingid == event.id)[0];
    console.log("FisrtBinacle"+reunionModificada.fibinnaclemeetingid);
    this.newActivityForm = this.fb.group({
      firequestid : [reunionModificada.firequestid],
      fccomments:reunionModificada.fccomments,
      fcinterviewer:reunionModificada.fcinterviewer,
      fdfinaldate:this.datepipe.transform(event.start.toDateString(), 'MM/dd/yyyy'),
      fibinnaclemeetingid:reunionModificada.fibinnaclemeetingid,
    });

  }

}
