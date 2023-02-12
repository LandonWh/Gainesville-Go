import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  reactiveForm:FormGroup;
  ngOnit() {}
  
  hide: boolean = false;
  constructor(private fb: FormBuilder) { }
  registerForm : FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern("^[a-zA-z']*$")]],
    lastName: ['', [Validators.required, Validators.pattern("^[a-zA-z']*$")]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  })
  
  get f () {
    return this.reactiveForm.controls
  }

  onLogin() {
    if (!this.registerForm.valid) {
      return;
    }
    console.log(this.registerForm.value);
  }
}
