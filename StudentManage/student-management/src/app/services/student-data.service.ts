import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StudentDataService {
  url = "http://localhost:3000/api/students/";
  constructor(private http: HttpClient) {}
  // list of students with specified limit for pagination
  getStudentsByLimit(offset, limit) {
    return this.http.get(this.url, {
      params: new HttpParams().set("offset", offset).set("limit", limit),
      observe: "response",
    });
  }
  // list of all active students
  getAllStudents() {
    return this.http.get(this.url, { observe: "response" });
  }
  // single student by given id
  getStudentById(id: string) {
    return this.http.get(this.url + id, { observe: "response" });
  }
  // adds student to database
  addStudent(studentData) {
    let form_data = new FormData();
    for (let key in studentData) {
      form_data.append(key, studentData[key]);
    }
    return this.http.post(this.url, form_data, { observe: "response" });
  }
  // updates student with given id
  updateStudent(studentData, studentId) {
    let form_data = new FormData();
    for (let key in studentData) {
      form_data.append(key, studentData[key]);
    }
    return this.http.patch(this.url + studentId, form_data, {
      observe: "response",
    });
  }
  // updates the status of student to in-active
  deactivateStudent(studentId) {
    return this.http.delete(this.url + studentId, { observe: "response" });
  }
  // get the count of all students( in-active and active)
  getStudentCount() {
    let options = { params: new HttpParams().set("total", "0") };
    return this.http.get(this.url, options);
  }
}
