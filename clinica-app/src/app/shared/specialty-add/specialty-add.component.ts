import { NotifyService } from './../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-specialty-add',
  templateUrl: './specialty-add.component.html',
  styleUrls: ['./specialty-add.component.css']
})
export class SpecialtyAddComponent implements OnInit {

  form: FormGroup;
  specialties: string[] = [];
  loading: boolean = false;

  constructor(
    private notify: NotifyService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      specialty: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.subscribeToSpecialties();
  }

  get specialty(){return this.form.get('specialty')}

  onAddSpecialty(){

    if(this.specialties.some(s => s.toLowerCase() == this.specialty.value.toLowerCase())){
      this.notify.toastNotify('Error agregando especialidad', 'Esa especialidad ya existe');
      return;
    }

    this.loading = true;

    this.auth.addSpecialty(this.specialty.value.toLowerCase()).then(
      res => {
        this.loading = false;
        this.form.reset();
      },
      err => {
        this.notify.toastNotify('Error agregando especialidad', 'Por favor, intente más tarde');
        this.loading = false;
      }
    );
  }

  subscribeToSpecialties(){
    this.auth.getSpecialties().snapshotChanges().subscribe(
      ref => {
        this.specialties = [];
        ref.forEach(item => this.specialties.push(item.payload.doc.get('label')))
      }
    );
  }

}
