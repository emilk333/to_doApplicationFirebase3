import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Http, Response } from '@angular/http' ;
import { Task } from '../../model/todo-model';
import { Category } from '../../model/category-model';
import { MaterialModule } from '../../material/material.module';
import { buttonState, todoAnimation, fromVoidAnimation} from '../../animations/animations';
import { TaskService } from "../../services/todo-service.service";
import { config } from "../../config/app.config.js";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { TodoComponent } from '../../component/single-todo/todo.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css'],
  animations: [
    buttonState,
    todoAnimation,
    fromVoidAnimation,
  ]
})

export class TodoContainerComponent implements OnInit {

  @Input() task: Task;
  @ViewChild('top') element: ElementRef;
  

  //animation states
  buttonState:string = 'normal';
  taskLength:number;
  taskReady:boolean = true;

  // data structures
  new_description: string;
  new_category: string;
  check: boolean;
  tasks: Observable<any[]>;
  isEdit: boolean = false;
  taskToEdit: any = {};
  addState: boolean = false;

  //Weather + geo data
  lat:any;
  lng:any;
  degree:any;
  kelvin:number = 272.15;
  mainWeather:string;
  weatherReady:boolean = false;

  //date
  date:any = new Date();

  //images vars
  imagePath:string;

  constructor(private http: Http, private db: AngularFirestore, private taskService: TaskService) {}

  ngOnInit() {
    //this.tasks = this.db.collection(config.collection_endpoint).valueChanges();
   //Detect collection changes and add the 'id' metadata for document manipulation
   this.tasks = this.db
   .collection(config.collection_endpoint)
   .snapshotChanges()
   .pipe(map(actions => {
     return actions.map(a => {
      //Get document data
      const data = a.payload.doc.data() as Task;
      //  this.taskLength = data;
      //Get document id
      const id = a.payload.doc.id;
      this.taskReady = false
      this.taskLength = actions.length;
      //Use spread operator to add the id to the document data
      return { id, ...data };
     })
   }))  
   
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      // this.location = position.coords;
      // console.log(position.coords);
      this.getWeather();
      setTimeout(()=>{    // apparently the function needs to wait 100 miliseconds before being called.
        this.findIcon();
      },400);
    });
  }


  }

  trackFbObjects = (index, obj) => obj.id;

  setOpen(isOpen:boolean) {
    this.buttonState = isOpen ? "open" : "normal";
    // console.log(this.buttonState);
  }

  expandCreate() {
    this.addState = !this.addState;
      this.element.nativeElement.scrollIntoView({ behavior: "smooth", block: "end", }, true);
  }


 saveTask() {
   if (this.new_description && this.new_category !== null) {
     //Get the input value
     let task = {
       description: this.new_description,
       category: this.new_category,
       check: false,
     };
      this.taskService.addTask(task);
     }
     //set edit mode to false and clear form
     this.isEdit = false;
     this.new_description = "";
     this.new_category = "";
   }



  /*************************************** Weather API ********************************************/


  getWeather() {
    this.http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + this.lat + '&lon=' + this.lng + '&appid=a63a8b17b4003c0e89b582ee9eb5ca90')
      .subscribe(
        (res: Response) => {
          const weather = res.json();
          // console.log(weather);
          this.degree = Math.round(weather.main.temp - this.kelvin);
          this.mainWeather = weather.weather[0].icon;
          // console.log(this.mainWeather);
      });
  }

  findIcon() {
    switch(this.mainWeather) {
      case "01d": {
        this.imagePath = "assets/images/weather-clear.png";
        this.weatherReady = true;
        break;
      }
      case "01n": {
        this.imagePath = "assets/images/weather-clear-night.png";
        this.weatherReady = true;
        break;
      }
      case "02d": {
        this.imagePath = "assets/images/weather-few-clouds.png";
        this.weatherReady = true;
        break;
      }
      case "02n": {
        this.imagePath = "assets/images/weather-few-clouds-night.png";
        this.weatherReady = true;
        break;
      }
      case "03d": {
        this.imagePath = "assets/images/weather-few-clouds.png";
        this.weatherReady = true;
        break;
      }
      case "03n": {
        this.imagePath = "assets/images/weather-few-clouds-night.png";
        this.weatherReady = true;
        break;
      }
      case "04d": {
        this.imagePath = "assets/images/weather-clouds.png";
        this.weatherReady = true;
        break;
      }
      case "04n": {
        this.imagePath = "assets/images/weather-clouds-night.png";
        this.weatherReady = true;
        break;
      }
      case "09d": {
        this.imagePath = "assets/images/weather-showers-day.png";
        this.weatherReady = true;
        break;
      }
      case "09n": {
        this.imagePath = "assets/images/weather-showers-night.png";
        this.weatherReady = true;
        break;
      }
      case "10d": {
        this.imagePath = "assets/images/weather-drizzle-day.png";
        this.weatherReady = true;
        break;
      }
      case "10n": {
        this.imagePath = "assets/images/weather-drizzle-night.png";
        this.weatherReady = true;
        break;
      }
      case "11d": {
        this.imagePath = "assets/images/weather-storm-day.png";
        this.weatherReady = true;
        break;
      }
      case "11n": {
        this.imagePath = "assets/images/weather-storm-night.png";
        this.weatherReady = true;
        break;
      }
      case "13d": {
        this.imagePath = "assets/images/weather-snow-scattered-day.png";
        this.weatherReady = true;
        break;
      }
      case "13n": {
        this.imagePath = "assets/images/weather-snow-scattered-night.png";
        this.weatherReady = true;
        break;
      }
      case "50d": {
        this.imagePath = "assets/images/weather-mist.png";
        this.weatherReady = true;
        break;
      }
      case "50n": {
        this.imagePath = "assets/images/weather-mist.png";
        this.weatherReady = true;
        break;
      }
      
      default: {
        this.imagePath = "assets/images/unknown.png";
        this.weatherReady = true;
        console.log(this.mainWeather);
      }
    }
  }



}
