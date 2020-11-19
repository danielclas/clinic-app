import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-staff-approval',
  templateUrl: './staff-approval.component.html',
  styleUrls: ['./staff-approval.component.css']
})
export class StaffApprovalComponent implements OnInit {

  users: User[] = [];
  loading: boolean = false;
  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.getPendingApprovalList();
  }

  getPendingApprovalList(){
    this.auth.getAllUsers().snapshotChanges().subscribe(
      ref => {
        this.loading = true;
        this.users = [];
        ref.forEach(
          item => {
            let doc = item.payload.doc;

            if(doc.get('type') == 'Staff' && !doc.get('enabled')){
              this.users.push(doc.data() as User);
            }
          }
        )

        this.loading = false;
      }
    )
  }

  printSpecialties(user: User){

    let str: String = '';

    user.specialties.forEach( a => str += a + ' | ');

    return str.substring(0, str.length-2);
  }

  onApprove(user: User){

    this.loading = true;

    let name = user.name + ' ' + user.surname;
    this.auth.setUserApproval(user.uid, name).add(
      res => {
        this.loading = false;
      }
    );
  }

}
