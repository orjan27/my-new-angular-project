import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from '../shared/date-validator';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  submitted = false;
  employeeForm: FormGroup;

  constructor(private route: ActivatedRoute,private router: Router,
    private employeeService: EmployeeService, private fb: FormBuilder) {
      this.employeeForm = this.fb.group({
        birthDate: ['', Validators.compose([Validators.required, DateValidator.dateVaidator])],
        dateHired: ['', Validators.compose([Validators.required, DateValidator.dateVaidator])]
      });
     }

  ngOnInit() {
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => console.log(data), error => console.log(error));
    this.employee = new Employee();
    this.gotoList();
  }

  onSubmit() {
    if(this.validate()){
      this.submitted = true;
      this.save();       
    }    
       
  }

  gotoList() {
    this.redirectTo('/employees');

  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
 
 addContactInfo() {
    this.employee.contactInfos.push({
      val: '',
      primry: false
    });
  }

  removeContactInfo(i: number) {
    this.employee.contactInfos.splice(i, 1);
  }

  addAddressInfo() {
    this.employee.addressInfos.push({
      address1: '',
      address2: '',
      primry: false
    });
  }

  removeAddressInfo(i: number) {
    this.employee.addressInfos.splice(i, 1);
  }

  validate() {
    var isValid = true;
    if(!this.employeeForm.valid){
      alert("Invalid Date Format.");
      isValid = false;
    }
    
    var i;
    var contactInfoPrimryCount = 0;
    for (i = 0; i < this.employee.contactInfos.length; i++) {  
      if(Boolean( this.employee.contactInfos[i].primry)){
        contactInfoPrimryCount=contactInfoPrimryCount+1;
        console.log("inside: "+contactInfoPrimryCount);
      }
    }

    if(this.employee.contactInfos.filter( x => Boolean(x.primry)).length > 1){
      alert("For contact info and address info, only one row can be selected as primary.");
      isValid = false;
    }
    
    return isValid;
  }
}
