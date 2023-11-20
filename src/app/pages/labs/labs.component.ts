import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola desde el componente';
  changes = 0;
  task = signal([
    'Instalar el Angular CLI',
    'Crear Proyecto',
    'Crear Componente',
    'crear servicio'
  ]);

 name= signal("cristopher");
  age= "30";
  dissable = true;
  img="../../../assets/avatar.png"

  person = signal({
    name: "Cristopher",
    age: 30,
    img: "../../../assets/avatar.png"

  })

  ClickImg(){
    alert("auch");
  }

  ClickHandler(){
    alert('Hola')
  }

  ChangeHandler(event: Event){
    const input= event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHandler(event: KeyboardEvent){
    const input= event.target as HTMLInputElement;
    console.log(input.value)
  }

  combinacion(){
    alert('se presiono la combinacion shift+t');
  }
}
