export interface Billete {
  valor: 50 | 100 | 200 | 500;
  cantidad: number;
}


export class Cajero {

  dinero: Billete[] = [];
  constructor(dinero: Billete[]) {
    this.dinero = dinero;
  }

  retirarDinero(cantidad: number): Billete[]{
    const billetesEntregados: Billete [] = [
      {
        cantidad: 0,
        valor: 500
      },
      {
        cantidad: 0,
        valor: 200
      },
      {
        cantidad: 0,
        valor: 100
      },
      {
        cantidad: 0,
        valor: 50
      }
    ];


    let cantidadRestante = cantidad;

    while(cantidadRestante > 0) {

      if( cantidadRestante/500>=1 && this.dinero[0].cantidad > 0){
        billetesEntregados[0].cantidad = billetesEntregados[0].cantidad + 1;
        this.dinero[0].cantidad--;
        cantidadRestante -=500;
        
      } else 
      if( cantidadRestante/200>=1 && this.dinero[1].cantidad > 0){
        billetesEntregados[1].cantidad++;
        this.dinero[1].cantidad = this.dinero[1].cantidad - 1;
        cantidadRestante -=200;
      } else
      if( cantidadRestante/100>=1 && this.dinero[2].cantidad > 0){
        billetesEntregados[2].cantidad++;
        this.dinero[2].cantidad--;
        cantidadRestante -=100;

      } else
      if( cantidadRestante/50>=1 && this.dinero[3].cantidad > 0){
        billetesEntregados[3].cantidad++;
        this.dinero[3].cantidad--;
        cantidadRestante -=50;
      }
    }

    return billetesEntregados;
  }

  efectivoActual(): number{
    let total = 0;

    for (let i = 0; i < this.dinero.length; i++) {
      const billete = this.dinero[i];
      total += billete.valor * billete.cantidad;
    }

    return total;
  }

}