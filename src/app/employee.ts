import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  gender: string;
  maritalStatus: string;
  position: string;
  dateHired: string;
  contactInfos: any[] = [{
    id: 0,
    val: '',
    primry: false
  }];
  addressInfos: any[] = [{
    id: 0,
    address1: '',
    address2: '',
    primry: false
  }];
  nYearsInTheCompany: string;
  age: string;
  primaryContactInfo: string;
  primayAddressInfo: string;
}
