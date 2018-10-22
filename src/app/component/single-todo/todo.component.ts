import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Http, Response} from '@angular/http' ;
import { Task } from '../../model/todo-model';
import { Category } from '../../model/category-model';
import { MaterialModule } from '../../material/material.module';
import { buttonState, todoAnimation } from '../../animations/animations';
import { TaskService } from "../../services/todo-service.service";
import { config } from "../../config/app.config.js";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TodoContainerComponent } from '../../container/todo-container/todo-container.component';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  animations: [
    buttonState,
    todoAnimation,
  ]
})

export class TodoComponent {

  buttonState1:string = 'normal';
  buttonState2:string = 'normal';
  taskToEdit: any = {};
  taskToEditTEST: any = {};
  edit_description:string = "";
  edit_category: string;
  marked: boolean;

  @Input() task: Task;
  @Input() isEdit: boolean;
  @Input() check: boolean;
  @Input() categoryList: Category[];
  @Input() tasks: Observable<any[]>;

  @Output() remove = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

  constructor(private db: AngularFirestore, private taskService: TaskService) { }

  ngOnInit() {
    
  }

  /*
  When clicked on the checkbox in the component view call this function
  It takes a object of todo from the type TodoModel defined by the model class
  Emits the todo object to the Output in form of a "change" object
  */

  // callParentCheck(task: Task) {
  //   this.checked.emit(task);
  // }

  callParentRemove(task: Task) {
    this.remove.emit(task);
  }

  callParentEdit(task: Task) {
    this.edit.emit(task);
  }

  setOpen1(isOpen:boolean) {
    this.buttonState1 = isOpen ? "open" : "normal";
  }

  setOpen2(isOpen:boolean) {
    this.buttonState2 = isOpen ? "open" : "normal";
  }

  toggleCheck(task: Task) {
    this.taskToEditTEST = task;
    let taskId = this.taskToEditTEST.id;
    this.taskService.updateTask(taskId, task);
    // console.log(this.task);
  }

  editTask(task: Task) {
    // console.log("editTaks set to True (show submit button)");
    this.isEdit = true;
    this.taskToEdit = task;

    this.edit_description = task.description;
    this.edit_category = task.category;

    // console.log(task);
  }

  submitEditTask() {
      let task = {
        description: this.edit_description,
        category: this.edit_category,
      }
      if (!this.isEdit) {
        console.log("error - should not able to edit anything");
      } else {
        let taskId = this.taskToEdit.id;
        this.taskService.updateTask(taskId, task);
      }
      this.isEdit = false;
  }

  deleteTask(task: Task) {
    //Get the task id
    let taskId = task.id;
    //delete the task
    this.taskService.deleteTask(taskId);
  } //deleteTask

}
