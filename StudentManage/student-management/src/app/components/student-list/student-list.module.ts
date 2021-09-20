import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StudentListRoutingModule } from "./student-list-routing.module";
import { StudentListComponent } from "./student-list.component";
import { EditStudentComponent } from "./edit-student/edit-student.component";
import { StudentDetailComponent } from "./student-detail/student-detail.component";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddStudentComponent } from "./add-student/add-student.component";
import { StudentFormComponent } from "./student-form/student-form.component";
import { AlertModule } from "ngx-bootstrap/alert";
import { ModalModule } from "ngx-bootstrap/modal";
@NgModule({
  declarations: [
    StudentListComponent,
    EditStudentComponent,
    StudentDetailComponent,
    AddStudentComponent,
    StudentFormComponent,
  ],
  imports: [
    CommonModule,
    StudentListRoutingModule,
    FormsModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
  ],
})
export class StudentListModule {}
