import { BrowserModule } from '@angular/platform-browser';
import { environment } from './../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import 'hammerjs';

//components
import { AppComponent } from './app.component';
import { TodoComponent } from './component/single-todo/todo.component';
import { TodoContainerComponent } from './container/todo-container/todo-container.component';

//material
import { MaterialModule } from './material/material.module';

//services
import { TaskService } from './services/todo-service.service';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoContainerComponent,
  ],
  imports: [
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
