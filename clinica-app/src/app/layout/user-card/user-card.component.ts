import { AnimateGallery } from './../../animations';
import { User } from './../../models/user';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { faUserCog, faUserMd, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UserType } from '../../models/user';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
  animations: [AnimateGallery]
})
export class UserCardComponent implements OnInit {

  icon: IconDefinition = faUser;
  userType: UserType = UserType.Patient;

  profilePictures: string[] = [];
  enabled: boolean = true;
  loading = true;
  types = UserType;

  constructor(
    public auth: AuthenticationService,
    public ts: TranslationService) { }

  ngOnInit(): void {
    this.auth.userAsigned.subscribe((user: User) => {
      if(user && user.type){

        this.setUserType(user);

        if(this.userType == UserType.Patient){
          this.getUserPictures();
        }
      }
    });

    if(this.auth.currentUser){
      this.setUserType(this.auth.currentUser);

      if(this.userType == UserType.Patient){
        this.getUserPictures();
      }
    }
  }

  setUserType(user: User){
    this.userType = user.type;
    this.enabled = user.enabled;

    if(this.userType == UserType.Admin){
      this.icon = faUserCog;
      this.enabled = true;
    }else if(this.userType == UserType.Staff){
      this.icon = faUserMd;
    }

    this.loading = false;
  }

  getUserPictures(){
    this.auth.getUserPictures().forEach(
      sub => sub.subscribe(url => {
        this.profilePictures.push(url)
        this.loading = this.profilePictures.length != 2;
      })
    );
  }
}
