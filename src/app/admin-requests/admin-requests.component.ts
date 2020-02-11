import {Component, OnInit} from '@angular/core';
import {AdminRequestsService} from './admin-requests.service';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.scss']
})
export class AdminRequestsComponent implements OnInit {

  public users = [];

  constructor(
    private adminRequestsService: AdminRequestsService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  public approveUser(userId) {
    this.adminRequestsService.approveUser({userId}).subscribe(() => {
      this.getUsers();
    });
  }

  private getUsers() {
    this.adminRequestsService.getUsers().subscribe((data) => {
      this.users = data.users;
    });
  }
}
