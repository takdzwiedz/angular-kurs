import { Component, OnInit } from '@angular/core';
import { Course, DataBaseService } from '../../data-base.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {

  courses: Array<Course>;

    constructor(private dbService: DataBaseService) { }

    ngOnInit() {
      this.dbService.getCourses().subscribe(list => {
        this.courses = list;
      });
    }

}
