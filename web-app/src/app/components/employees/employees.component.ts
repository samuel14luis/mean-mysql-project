import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';

declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form: NgForm) {
    if(form.value._id_news){
      this.employeeService.putEmployee(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Noticia Actualizada!'});
        this.getEmployees();      
      })
    } else {
      this.employeeService.postEmployee(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Noticia Insertada!'});
        this.getEmployees();
      });
    }
  }

  getEmployees(){
    this.employeeService.getEmployees()
    .subscribe(res => {
      this.employeeService.employees = res as Employee[];
      console.log(this.employeeService.employees,'xd',res);      
    });
  }

  editEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee;
  }

  deleteEmployee(_id_news: string){
      if(confirm('Seguro que desea eliminar?')){
        this.employeeService.deleteEmployee(_id_news).subscribe(res => this.getEmployees());
      }    
  }

  resetForm(form?: NgForm) {
    if(form){
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

}
