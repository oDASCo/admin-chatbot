import {Component, OnInit} from '@angular/core';
import {EntityService} from '../shared/services/entity.service';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {IEventPopup} from '../../shared/interfaces/event-popup';
import {IPopupData} from '../../shared/interfaces/popup-data';
import {IExamples} from '../../shared/interfaces/example';
import {AuthService} from '../../login/auth.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html'
})
export class EntitiesComponent implements OnInit {
  public searchStr: string;
  public entities = [];
  public pagination = false;
  public paginationNumber: number;
  public paginationsPages = [];
  public page: number;
  public deleteEntityPopupData: IPopupData;
  public addExamplePopupData: IPopupData;
  public addMessageExamples;
  public examples: IExamples;
  private entityId: number;
  private entitiesOnPage = 6;
  private entitiesCount: number;
  private eventPopup: IEventPopup;

  constructor(
    private entityService: EntityService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.searchStr = '';
    this.getEntities();
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getEntities();
    });
  }

  public openDeletePopup(id) {
    this.formPopupData(id, 'deleteEntity');
    this.deleteEntityPopupData = {
      popupType: 'delete_entity',
      popupTitle: 'Delete Entity',
      popupText: `This Entity will be deleted immediately. You can’t undo this action.
       Are you sure you want to delete entity ${id}?`
    };
  }

  public openAddExamplePopup(id) {
    this.entityId = id;
    this.formPopupData(id, 'addExamples');
    this.addExamplePopupData = {
      popupType: 'entity_addExample',
      popupTitle: 'Add Example',
      entityId: id
    };
  }

  public addExamples() {
    this.addExamplePopupData = null;
    const data = {
      entityId: this.entityId,
      examples: this.examples
    };
    this.entityService.addExample(this.authService.user.chatbot.id, data).subscribe(() => {
      this.getEntities();
      this.showMessage('addMessageExamples', `${this.examples.length} new examples added`);
    });
  }

  public onBtnAction(data) {
    if (this.eventPopup.method === 'addExamples') {
      this.examples = data;
    }
    this.callMethod(this.eventPopup);
  }

  public getEntities() {
    this.route
      .queryParams
      .subscribe(params => {
        this.page = params.pageNumber || 0;
        this.entityService.getEntities(this.authService.user.chatbot.id, this.page, this.entitiesOnPage).subscribe((data) => {
          this.entities = data.entities;
          this.entitiesCount = data.totalCount;
          this.setPagination(data);
        });
      });
  }

  public deleteEntity() {
    this.entityService.deleteEntity(this.authService.user.chatbot.id, this.eventPopup.id).subscribe(() => {
      this.getEntities();
      this.closePopup();
      this.rerenderPagination();
    });
  }

  public onSearch(event) {
    this.searchStr = event.target.value;
    setTimeout(() => {
      this.getEntities();
    }, 1000);
  }

  private closePopup() {
    this.deleteEntityPopupData = null;
  }

  private rerenderPagination() {
    this.entitiesCount = this.entitiesCount - 1;
    if (this.entitiesCount % this.entitiesOnPage === 0) {
      this.paginationsPages = this.paginationsPages.splice(this.paginationsPages.length, 1);
      this.router.navigate(['/entities-page', 'entities'], {queryParams: {pageNumber: 1}});
    }
  }

  private setPagination(data) {
    this.paginationNumber = Math.ceil(data.totalCount / this.entitiesOnPage);
    for (let i = 1; i <= this.paginationNumber; i++) {
      if (this.paginationsPages.length < this.paginationNumber) {
        this.paginationsPages.push(i);
      }
    }
    this.pagination = data.totalCount > this.entitiesOnPage && data.totalCount !== 0;
  }

  private callMethod(data) {
    const method = data.method;
    this[method](data.arguments);
  }

  private showMessage(message, text) {
    this[message] = {
      text,
      id: this.eventPopup.id
    };
    setTimeout(() => {
      this[message] = null;
    }, 3000);
  }

  private formPopupData(id, method) {
    this.eventPopup = {
      id,
      method
    };
  }
}
