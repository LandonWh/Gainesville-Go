import { ChangeDetectionStrategy, Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'

interface IAccountsItem {
  email: string
  password: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
  

})
export class AppComponent {
  title: any;

  public accountsItems: IAccountsItem[] = [

    {
      email: 'Hello',
      password: 'first password'
    },
    {
      email: 'another one',
      password: 'another value'
    }
  ]

  constructor(
    private httpClient: HttpClient
  ) {}

  // async loadAccountInfo() {
  //   this.accountsItems = await this.httpClient.get<IAccountsItem[]>('/api/').toPromise //Make a new request type in main.go and toPromise is deprecated, find replacement 
  // }

  // async addAccount() {
  //   await this.httpClient.post('/api/', {
  //     email: this.email,
  //     password: this.password
  //   }).toPromise //Make a new request type in main.go here too
  // }

}


