import { Component, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertComponent } from "ngx-bootstrap/alert";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { StudentDataService } from "../../services/student-data.service";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.scss"],
})
export class StudentListComponent implements OnInit {
  data: any[] = [];
  totalStudents: number;
  currentPage: number = 0;
  itemsPerPage: number = 10;
  listActive: boolean;
  studentId: string;
  student: any;
  alerts: any[] = [];
  modalRef?: BsModalRef;
  // length of page number in pagination component
  maxSize: number = 5;
  loading: boolean = false;
  router: any;
    constructor(private studentService: StudentDataService,) {}
  ngOnInit(): void {
    this.loading = true;
    this.studentService
      .getStudentsByLimit(0, this.itemsPerPage)
      .subscribe((resp: any) => {
        this.data = [...resp.body];
        this.loading = false;
      });
    this.studentService.getAllStudents().subscribe((data: any) => {
      this.totalStudents = data.body.length;
      this.loading = false;
    });
   /* this.studentId = this.route.snapshot.paramMap.get("id");
    this.student = this.studentService
      .getStudentById(this.studentId)
      .subscribe((resp: any) => {
        this.student = resp.body;
      });
      console.log(this.studentId);*/
      
  }
  pageSwitched(event) {
    this.loading = true;
    this.studentService
      .getStudentsByLimit(
        (event.page - 1) * this.itemsPerPage,
        this.itemsPerPage
      )
      .subscribe((resp: any) => {
        this.data = [...resp.body];
        this.loading = false;
      });
  }
 /*deactivateStudent(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }*/
  confirm(studentId) {
    event.stopPropagation();
    this.studentService
      .deactivateStudent(studentId)
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
  }
  decline() {
    this.modalRef?.hide();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}


}