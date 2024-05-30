import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Projects from '../../models/project';
import { ProjectService } from '../../services/Projects.service';

@Component({
  selector: 'project-list',
  standalone: true,
  templateUrl: './projectList.components.html',
  styleUrls: ['./projectList.components.css'],
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [DatePipe],
})
export class ProjectListComponent implements OnInit {
  Allprojects: Projects[] = [];
  projectID: any;
  dateNow = new Date();

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.projectService.GetAll().subscribe(
      (result: Projects[]) => {
        this.Allprojects = result.map((project: any) => {
          const endDate = new Date(project.endDate);

          return {
            ...project,
            createDate: this.datePipe.transform(
              new Date(project.createDate),
              'mediumDate',
              'Asia/Bangkok'
            ),
            endDate: this.datePipe.transform(
              endDate,
              'mediumDate',
              'Asia/Bangkok'
            ),
            startDate: this.datePipe.transform(
              new Date(project.startDate),
              'mediumDate',
              'Asia/Bangkok'
            ),
            updateDate: this.datePipe.transform(
              new Date(project.updateDate),
              'shortDate',
              'Asia/Bangkok'
            ),
          };
        });
        console.log(this.Allprojects);
      },
      (error) => {
        console.error(error);
        this.router.navigate(['signinpage']);

      }
    );
  }

  showConfirmation(id: number | string) {
    var result = confirm('ต้องการลบโปรเจค แน่ใจหรือไม่?'); // ใช้ข้อความที่ต้องการใส่ใน confirm

    if (result) {
      // เมื่อผู้ใช้กด Yes (OK)
      // เรียกใช้ฟังก์ชัน
      this.deleteProject(id);
    } else {
      // เมื่อผู้ใช้กด No (Cancel)
    }
  }
  deleteProject(id: number | string) {
    this.projectService.Delete(id).subscribe(
      (result) => {
        this.router.navigate(['projectlist']);
        window.location.reload();
      },
      (error) => {
        console.error("Can't delete this project");
        alert('something error: ' + error);
      }
    );
  }

  
}
