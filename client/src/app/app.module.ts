import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './main-page/main-page.component';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateEventComponent } from './create-event/create-event.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http'
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatDialogModule} from '@angular/material/dialog';
import { EventFormComponent } from './event-form/event-form.component'
import { FormsModule } from '@angular/forms';
import { RegisterService } from './register/register.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CreateEventComponent,
    NavbarComponent,
    MapComponent,
    LoginComponent,
    RegisterComponent,
    EventFormComponent,
  ],
  entryComponents: [EventFormComponent],
  imports: [
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    LeafletModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
