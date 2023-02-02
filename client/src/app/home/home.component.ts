import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})



export class HomeComponent implements OnInit{
  hide: boolean = false;
  constructor(private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  loginForm : FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })


  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }
  
}





