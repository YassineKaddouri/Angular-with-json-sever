import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }


  findAll(){
   return this.http.get<Task[]>("http://localhost:5000/tasks");
  }
  delete(id: any){
    return this.http.delete(`http://localhost:5000/tasks/${id}`)
  }
  persist(task:any){
    return this.http.post<Task>("http://localhost:5000/tasks",task)
  }
  update(task:any){
    return this.http.put(`http://localhost:5000/tasks/${task.id}`,task)
  }

}
