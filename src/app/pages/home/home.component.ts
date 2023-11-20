import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule,  Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Task } from "../../models/task.models";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  newTaskCtrl = new FormControl('',{
    nonNullable: true,
    validators: [
      Validators.required,

    ]
  });

  task = signal<Task[]>([
    {
      id: Date.now(),
      title: 'crear proyecto',
      completed: true
    },
    {
      id: Date.now(),
      title: 'crear componente',
      completed: false
    },
    {
      id: Date.now(),
      title: 'subir proyecto',
      completed: false
    },
  ]);


  changeHandler(){
      if(this.newTaskCtrl.valid){
        const value = this.newTaskCtrl.value.trim();
        if(value  != '' ){
          this.addTask(value);
          this.newTaskCtrl.setValue('')
        }

      }
  }

  addTask(title:string){
      const newTask={
        id: Date.now(),
        title,
        completed: false,
      };
      this.task.update((tasks)=>[...tasks, newTask]);
  }

  deleteTask(index: number){
    this.task.update((tasks)=> tasks.filter((task, position)=> position !== index));
  }

  updateTask(index: number){
    this.task.update((tasks)=>{
      return tasks.map((task, position)=>{
      if(position === index){
        return {
          ...task,
          completed: !task.completed
        }
      }
      return task;
      })
    })
  }
  updateTaskEditingMode(index: number){
    this.task.update((tasks)=>{
      return tasks.map((task, position)=>{
      if(position === index){
        return {
          ...task,
          editing: true
        }
      }
      return {
        ... task,
        editing: false
      }
      })
    })
  }

  updateTaskText(index: number, event: Event){
    const input= event.target as HTMLInputElement;

    this.task.update((tasks)=>{
      return tasks.map((task, position)=>{
      if(position === index){
        return {
          ...task,
          title: input.value,
          editing: false
      }}
        return task;
      })
    })
  }
}
