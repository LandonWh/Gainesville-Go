import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  deleteForm: FormGroup;
  hide: boolean = false;
  deleted: boolean = false;
  authError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService, private userService: UserService) {
    this.deleteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  deleteAccount() {
    if (this.deleteForm.invalid) {
      this.incorrectField();
      return
    }
    this.authService
      .delete(this.deleteForm.get('email')?.value, this.deleteForm.get('password')?.value)
      .subscribe(
        response => {this.router.navigate(['/login']),  console.log(response), this.tokenStorage.signOut(), this.deleted = true},
        err => {
          this.authError = true;
          this.deleteFailed()
        },
      );
  }

  incorrectField() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Missing a field, or incorrect email/password format',
    });
  }


  deleteFailed() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Email or password did not match an existing account in our database',
    });
    
  }

  
}
