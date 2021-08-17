import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Cajero } from './models/cajero.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cajero = new Cajero([
    {
      valor: 500,
      cantidad: 10
    },
    {
      valor: 200,
      cantidad: 15
    },
    {
      valor: 100,
      cantidad: 20
    },
    {
      valor: 50,
      cantidad: 50
    },
  ])

  cantidadARetirar = new FormControl('0', [Validators.min(50), Validators.required]);
  dineroActual = 0;

  constructor(public dialog: MatDialog) {
    this.dineroActual = this.cajero.efectivoActual();
  }

  openDialog(data:any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data
    });
  }

  agregarDinero(cantidad: number){
    const cantidadActual = Number(this.cantidadARetirar.value) + cantidad;
    this.cantidadARetirar.setValue(cantidadActual);
  }

  retirarDinero(){
    if(50 > this.cantidadARetirar.value) alert('ingresa una cantidad mayor a 50') 
    else
    if(this.dineroActual < this.cantidadARetirar.value) alert('no hay suficiente dinero') 
    else
    if(this.cantidadARetirar.value % 50 !== 0) alert('la cantidad no es valida')
    else {
      const resultado = this.cajero.retirarDinero(this.cantidadARetirar.value);
      this.dineroActual = this.cajero.efectivoActual();
      this.cantidadARetirar.setValue(0);
      this.openDialog(resultado)
    }
    
  }
}
