import { Component, signal, computed, effect, inject, Injector } from '@angular/core';
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

  task = signal<Task[]>([]);

  filter = signal<'all'|'pending'|'completed' >('all');
  taskByFilter = computed(()=>{
    const filter = this.filter();
    const tasks = this.task();
    if(filter === 'pending'){
      return tasks.filter(task => !task.completed);
    }
    if(filter === 'completed'){
      return tasks.filter(task => task.completed);
    }
    return tasks;
  } )

injector= inject(Injector);

  ngOnInit(){

    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage);
      this.task.set(tasks);
    }
    this.trackTasks();
  }


  trackTasks(){
    effect(()=>{
      const tasks = this.task();
      console.log('run effect', tasks);

      localStorage.setItem('tasks', JSON.stringify(tasks))
    },{injector: this.injector});
  }

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

  deleteTask(id: number){
    this.task.update((tasks)=> tasks.filter((task)=> task.id !== id));
  }

  updateTask(id: number){
    this.task.update((tasks)=>{
      return tasks.map((task)=>{
      if(task.id === id){
        return {
          ...task,
          completed: !task.completed
        }
      }
      return task;
      })
    })
  }
  updateTaskEditingMode(id: number){
    this.task.update((tasks)=>{
      return tasks.map((task)=>{
      if(task.id === id){
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

  updateTaskText(id: number, event: Event){
    const input= event.target as HTMLInputElement;

    this.task.update((tasks)=>{
      return tasks.map((task)=>{
      if(task.id === id){
        return {
          ...task,
          title: input.value,
          editing: false
      }}
        return task;
      })
    })
  }

  changeFilter(filter: 'all'|'pending'|'completed'){
    this.filter.set(filter)

  }
}
