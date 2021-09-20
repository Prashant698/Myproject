import { Component, OnInit } from "@angular/core";
import { StudentDataService } from "../../services/student-data.service";

@Component({
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  totalStudents: number;
  activeStudents: any;
  maleStudents: any;
  maleStudentsPercentage: number;
  femaleStudents: any;
  femaleStudentsPercentage: number;
  constructor(private studentService: StudentDataService) {}
  ngOnInit(): void {
    this.studentService.getStudentCount().subscribe((data: any) => {
      this.totalStudents = data[0].totalStudents;
    });
    this.studentService.getAllStudents().subscribe((resp: any) => {
      let data = [...resp.body];
      this.activeStudents = data;
      this.maleStudents = data.filter((item) => item.gender == "M");
      this.maleStudentsPercentage = Math.floor(
        (this.maleStudents.length / this.activeStudents.length) * 100
      );
      this.femaleStudents = data.filter((item) => item.gender == "F");
      this.femaleStudentsPercentage = Math.floor(
        (this.femaleStudents.length / this.activeStudents.length) * 100
      );
    });
  }
}
