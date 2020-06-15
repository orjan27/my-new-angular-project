import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from '../shared/date-validator';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  employee: Employee;
  employeeForm: FormGroup;

  constructor(private route: ActivatedRoute,private router: Router,
    private employeeService: EmployeeService, private fb: FormBuilder) {
      this.employeeForm = this.fb.group({
        birthDate: ['', Validators.compose([Validators.required, DateValidator.dateVaidator])],
        dateHired: ['', Validators.compose([Validators.required, DateValidator.dateVaidator])]
      });
     }

  ngOnInit() {
    this.employee = new Employee();

    this.id = this.route.snapshot.params['id'];
    
    this.employeeService.getEmployee(this.id)
      .subscribe(data => {
        console.log(data)
        this.employee = data;
      }, error => console.log(error));

  
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.id, this.employee)
      .subscribe(data => console.log(data), error => console.log(error));
    this.employee = new Employee();
    this.gotoList();
  }

  onSubmit() {
    if(this.validate()){
      this.updateEmployee();       
    }    
  }

  gotoList() {
    this.redirectTo('/employees');
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







}
