export class User{
  uid: string;
  email: string;
  name: string;
  surname: string;
  type: UserType;
  specialties?: string[];
  pictures?: string[];
  enabled?: boolean;

  constructor(){}
}

export enum UserType{
  Admin = 'Admin',
  Patient = 'Patient',
  Staff = 'Staff'
}
