import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../service/task.service";
import {Task} from "../../models/task";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  searchText = '';
  showForm = false;
  editForm= false;
  myTask: Task ={
    label:'',
    completed: false
  }
 tasks: Task[] = [];
  resultTasks: Task[] = [];

  constructor(private taskService: TaskService, private toastr: ToastrService) { }

  ngOnInit(): void {
   this.getTasks();
  }
 getTasks(){
    this.taskService.findAll()
      .subscribe(tasks => this.resultTasks = this.tasks=tasks)
 }
  deleteTask(id :any){
    this.taskService.delete(id)
      .subscribe(()=>{
        this.resultTasks=this.tasks.filter(task=> task.id !=id)
      })

  }
  persistTask(){
    this.taskService.persist(this.myTask)
      .subscribe((task)=>{
      this.tasks= [task, ...this.tasks];
        this.showToast();
        this.resetTask();
      this.showForm= false;

    })
  }
  resetTask(){
    this.myTask={
      label:'',
      completed: false
    }
  }

  editTask(task :any){
    this.myTask = task
    this.editForm=true;
  }

  updateTask(){
    this.taskService.update(this.myTask)
      .subscribe(task=>{
        this.resetTask();
        this.editForm=false;

      })
  }
  searchTasks(){
    this.resultTasks=this.tasks.filter((task) => task.label.includes(this.searchText))

  }
  showToast(){
    this.toastr.success("Tasks a ete bien enregistre");
  }
}
