import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarDateFormatter } from 'angular-calendar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeetingService } from '../../services/meeting.service';
import { Router } from '@angular/router';
import { Meeting } from '../../shared/meeting.model';
import { DatePipe } from '@angular/common';
import { Request } from '../../shared/request.model';
import { Observable } from 'rxjs';
import { ModalMessageService } from '../../services/modal-message.service';
import { MODAL_SUCCESS, ModalData, MODAL_ERROR } from '../../shared/constants';

@Component({
  selector: 'app-activity',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activity.component.html'
})
export class ActivityComponent implements OnInit {

  view: string = 'month';

  viewDate: Date = new Date();

  events$: Observable<Array<CalendarEvent<{ meeting: Meeting }>>>;

  @ViewChild('frame') frameModal;

  newActivityForm: FormGroup;

  requests: Request[];

  datepipe = new DatePipe('es-MX');

  meetings = new Array<Meeting>();
  meetingSelected: Meeting;
  submitted:boolean= false;

  constructor(
    private fb: FormBuilder,
    private meetingService: MeetingService,
    private modalMessageService:ModalMessageService,
    public router: Router
  ) {
    this.newActivityForm = fb.group({
      title: [null, Validators.required],
      fccomments: [null, Validators.required],
      firequestid: [null, Validators.required],
      fcinterviewer: [null, Validators.required],
      fdfinaldate: [null, Validators.required],
      fibinnaclemeetingid: [null, Validators.required],
    });
  }

  @ViewChild('content') public contentModal;

  dateSelected: Date;

  show(dateSelected: Date) {
    console.log("Maaaaaaadres", dateSelected);
    this.newActivityForm.reset();
    this.dateSelected = dateSelected;
    this.contentModal.show();
    this.meetingSelected = undefined;
  }

  showMessage(type:boolean, error:any){
    if(type)
          this.modalMessageService.showModalMessage(
            new ModalData(MODAL_SUCCESS, ["Se agregó la actividad correctamente"], "activity")
          );
    else{
      console.error(error)
      if (error.errors)
        this.modalMessageService.showModalMessage(
          new ModalData(MODAL_ERROR, error.errors, "activity")
        );
      else
        this.modalMessageService.showModalMessage(
          new ModalData(MODAL_ERROR, [error.status + "-" + error.message], "activity")
        );
    }
  }

  addMeeting(meeting: any) {

    meeting.fddate = this.datepipe.transform(new Date().toDateString(), 'MM/dd/yyyy');
    meeting.fdscheduledate = this.datepipe.transform(this.dateSelected, 'MM/dd/yyyy');
    meeting.fdfinaldate = this.datepipe.transform(meeting.fdfinaldate, 'MM/dd/yyyy');

    if (meeting.fibinnaclemeetingid != null) {
      console.log("Modificar");
      this.meetingService.updateMeeting(meeting).subscribe(
        res => {
          this.contentModal.hide();
          this.showMessage(true, null);
        },
        error => {
          this.showMessage(false, error);
        }
      );
    } else {
      console.log("Agregar", meeting);
      this.meetingService.createMeeting(meeting).subscribe(
        res => {
          this.contentModal.hide();
          this.showMessage(true, null);
        },
        err => {
          console.log("Error en login");
          this.showMessage(false, err);
        }
      );
    }

  }

  ngOnInit() {

    this.meetingService.loadRequest().subscribe(
      requests => {
        this.requests = requests;
      }
    );

    this.events$ = this.meetingService.getMeetings();
  }

  get f() { return this.newActivityForm.controls; }

  handleEvent(event: CalendarEvent): void {

    this.dateSelected = event.start;
    this.meetingSelected = event.meta.meeting;
    this.contentModal.show();

    console.log("META", event.meta);

    let reunionModificada = event.meta.meeting;

    this.newActivityForm = this.fb.group({
      firequestid: [reunionModificada.firequestid],
      fccomments: reunionModificada.fccomments,
      fcinterviewer: reunionModificada.fcinterviewer,
      fdfinaldate: new Date(this.meetingSelected.fdfinaldate),
      fibinnaclemeetingid: reunionModificada.fibinnaclemeetingid,
    });

  }

}
