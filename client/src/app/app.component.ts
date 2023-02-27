import { ChangeDetectionStrategy, Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { lastValueFrom } from 'rxjs';

// interface IAccountInfo {
//   firstName: string
//   lastName: string
//   email: string
//   password: string
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
  

})
export class AppComponent {

  // public firstName = ''
  // public lastName = ''
  // public email = ''
  // public password = ''
  // public accountInfoItems: IAccountInfo[] = [

  //   {
  //     firstName: 'John',
  //     lastName: 'Smith',
  //     email: 'Hello',
  //     password: 'first password'
  //   },
  //   {
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     email: 'Hello',
  //     password: 'first password'
  //   }
  // ]

  // constructor(
  //   private httpClient: HttpClient
  // ) {}

  // //.promise replacement from https://stackoverflow.com/questions/67044273/rxjs-topromise-deprecated
  // public async loadAccountInfo() {
  //   const accountInfoItems$ = this.httpClient.get<IAccountInfo[]>('/api');
  //   this.accountInfoItems = await lastValueFrom(accountInfoItems$);
  //   //this.accountInfoItems = await this.httpClient.get<IAccountInfo[]>('/api/').toPromise //Make a new request type in main.go and toPromise is deprecated, find replacement 
  // }

  // public async createAccount() {
  //   await this.httpClient.post('/api/', {
  //     firstName: this.firstName,
  //     lastName: this.lastName,
  //     email: this.email,
  //     password: this.password
  //   })
  //   this.firstName = ''
  //   this.lastName = ''
  //   this.email = ''
  //   this.password = ''
  //    //Make a new request type in main.go here too
  // }
  
}


