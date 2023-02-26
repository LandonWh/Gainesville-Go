
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  ngOnit() {
    
  }

  form: FormGroup;
  
  hide: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password);
    }
  }
  
}
