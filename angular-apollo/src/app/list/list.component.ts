import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { Project } from './types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  loading: boolean;
  error: any;
  projects: Project[] = [];
  projectsByAuthor: Project[] = [];

  authorControl = new FormControl();
  nameControl = new FormControl()
  authorSearchControl = new FormControl();

  private querySubscription: Subscription;
  private searchQuerySubscription: Subscription;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
    this.getProjectsByAuthor();
  }

  addProject() {
    const name = this.nameControl.value;
    const createdBy = this.authorControl.value;
    this.projectService.addProject(name, createdBy).subscribe((data: any) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  getProjects() {
    this.querySubscription = this.projectService.getProjects()
      .subscribe((result:any) => {
        this.loading = result.loading;
        this.projects = result?.data?.projects;
        this.error = result.error;
      });
  }

  getProjectsByAuthor() {
    this.authorSearchControl.valueChanges.subscribe(value => {
      this.searchQuerySubscription = this.projectService.getProjectsByAuthor(value)
      .subscribe((result:any) => {
        this.loading = result.loading;
        this.projectsByAuthor = result?.data?.projectsByAuthor;
        this.error = result.error;
      });
    })
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
    this.searchQuerySubscription.unsubscribe();
  }

}
