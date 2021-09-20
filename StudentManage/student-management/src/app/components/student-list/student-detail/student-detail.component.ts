import { Component, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertComponent } from "ngx-bootstrap/alert";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { StudentDataService } from "../../../services/student-data.service";

@Component({
  selector: "app-student-detail",
  templateUrl: "./student-detail.component.html",
  styleUrls: ["./student-detail.component.scss"],
})
export class StudentDetailComponent implements OnInit {
  listActive: boolean;
  studentId: string;
  student: any;
  alerts: any[] = [];
  modalRef?: BsModalRef;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentDataService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get("id");
    this.student = this.studentService
      .getStudentById(this.studentId)
      .subscribe((resp: any) => {
        this.student = resp.body;
      });
  }
  deactivateStudent(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }
  confirm() {
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
    this.modalRef?.hide();
  }
  decline() {
    this.modalRef?.hide();
  }
  onClosed(dismissedAlert: AlertComponent) {
    this.router.navigate(["/students"]);
    this.alerts = this.alerts.filter((alert) => alert != dismissedAlert);
  }
}
