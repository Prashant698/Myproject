import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertComponent } from "ngx-bootstrap/alert";
import { StudentDataService } from "../../../services/student-data.service";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.scss"],
})
export class AddStudentComponent implements OnInit {
  alerts: any[];
  constructor(
    private studentService: StudentDataService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.alerts = [];
  }
  addStudent(event) {
    this.studentService.addStudent(event).subscribe((resp: any) => {
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
  onClosed(dismissedAlert: AlertComponent) {
    this.router.navigate(["/students"]);
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }
}
