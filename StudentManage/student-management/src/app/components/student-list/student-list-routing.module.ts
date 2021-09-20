import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeleteComponent } from "../delete/delete.component";
import { AddStudentComponent } from "./add-student/add-student.component";
import { EditStudentComponent } from "./edit-student/edit-student.component";
import { StudentDetailComponent } from "./student-detail/student-detail.component";
import { StudentListComponent } from "./student-list.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Students",
    },
    children: [
      { path: "", redirectTo: "list" },
      {
        path: "list",
        component: StudentListComponent,
        data: {
          title: "List",
        },
      },
      {
        path: "add",
        component: AddStudentComponent,
        data: { title: "Add Student" },
      },
      {
        path: ":id",
        children: [
          { path: "", redirectTo: "details" },
          {
            path: "details",
            component: StudentDetailComponent,
            data: { title: "Details" },
          },
          {
            path: "edit",
            component: EditStudentComponent,
            data: { title: "Edit" },
          },
          {
            path: "delete",
            component: DeleteComponent,
            data: { title: "Delete"}
          }
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentListRoutingModule {}
