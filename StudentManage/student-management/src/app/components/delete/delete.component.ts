import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StudentDataService } from '../../services/student-data.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  studentId: any;
  listActive: boolean;
  student: any;
  alerts: any[] = [];
  modalRef?: BsModalRef;
  
  constructor(private studentService: StudentDataService, 
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get("id");
    this.student = this.studentService
      .getStudentById(this.studentId)
      .subscribe((resp: any) => {
        this.student = resp.body;
      });
      console.log(this.studentId);
      console.log(this.student)
  }
 /*
  deactivateStudent(event) {
    this.studentService
      .deactivateStudent(this.studentId)
      .subscribe((resp: any) => {
        if (resp.ok) {
          this.alerts.push({
            type: "success",
            msg: resp.body.message,
            timeout: 4000,
          });
        } else {
          this.alerts.push({
            type: "danger",
            msg: "Something Went Wrong!",
            timeout: 4000,
          });
        }
      });
  }*/
    deactivateStudent(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
    console.log(this.modalRef)
  }
  confirm(event) {
    this.studentService
      .deactivateStudent(this.studentId)
      .subscribe((resp: any) => {
        if (resp.ok) {
          this.alerts.push({
            type: "success",
            msg: resp.body.message,
            timeout: 4000,
          });
          console.log(this,this.studentService)
        } else {
          this.alerts.push({
            type: "danger",
            msg: "Something Went Wrong!",
            timeout: 4000,
          });
        }
      });
      console.log(confirm())
  }
  decline() {
    this.modalRef?.hide();
    
  }

  
  

}
