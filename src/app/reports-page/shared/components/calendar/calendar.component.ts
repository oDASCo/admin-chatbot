import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public date = moment();
  public dateForm: FormGroup;
  public daysArr = [];
  private dateFormat = 'MM/DD/YYYY';

  @Output() btnAction: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.initDateRange();
  }

  public initDateRange() {
    return (this.dateForm = this.fb.group({
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required]
    }));
  }

  public ngOnInit() {
    this.daysArr = this.createCalendar(this.date);
  }

  public createCalendar(month) {
    const firstDay = moment(month).startOf('M');
    const days = Array.apply(null, {length: month.daysInMonth()})
      .map(Number.call, Number)
      .map(n => {
        return moment(firstDay).add(n, 'd');
      });

    for (let n = 1; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }
    return days;
  }

  public nextMonth() {
    this.date.add(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }

  public previousMonth() {
    this.date.subtract(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }

  public todayCheck(day) {
    if (!day) {
      return false;
    }
    return moment().format('L') === day.format('L');
  }

  public isSelected(day) {
    if (!day) {
      return false;
    }
    const dateFromMoment = moment(this.dateForm.value.dateFrom, this.dateFormat);
    const dateToMoment = moment(this.dateForm.value.dateTo, this.dateFormat);
    if (this.dateForm.valid) {
      return (
        dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)
      );
    }
    if (this.dateForm.get('dateFrom').valid) {
      return dateFromMoment.isSame(day);
    }
  }

  public isStartDate(day) {
    if (!day) {
      return false;
    }
    const dateFromMoment = moment(this.dateForm.value.dateFrom, this.dateFormat);
    if (this.dateForm.valid) {
      return (
        dateFromMoment.isSame(day)
      );
    }
  }

  public isEndDate(day) {
    if (!day) {
      return false;
    }
    const dateToMoment = moment(this.dateForm.value.dateTo, this.dateFormat);
    if ((this.dateForm.valid) && (this.isSelected(day))) {
      return (
        dateToMoment.isSame(day)
      );
    }
  }

  public isMiddleDate(day) {
    if (!day) {
      return false;
    }
    const dateToMoment = moment(this.dateForm.value.dateTo, this.dateFormat);
    const dateFromMoment = moment(this.dateForm.value.dateFrom, this.dateFormat);

    if ((this.dateForm.valid) && (this.isSelected(day))) {
      return (
        !dateFromMoment.isSame(day) && !dateToMoment.isSame(day)
      );
    }
  }

  public selectedDate(day) {
    const dayFormatted = day.format(this.dateFormat);
    if (this.dateForm.valid) {
      this.dateForm.setValue({dateFrom: null, dateTo: null});
      return;
    }
    if (!this.dateForm.get('dateFrom').value) {
      this.dateForm.get('dateFrom').patchValue(dayFormatted);
    } else {
      this.dateForm.get('dateTo').patchValue(dayFormatted);
    }
    if (!this.dateForm.valid) {
      return;
    }
    const selectedDate = {
      dateFromMoment: moment(this.dateForm.value.dateFrom, this.dateFormat).format('YYYY-MM-DD'),
      dateToMoment: moment(this.dateForm.value.dateTo, this.dateFormat).format('YYYY-MM-DD')
    };
    this.btnAction.emit(selectedDate);
  }
}
