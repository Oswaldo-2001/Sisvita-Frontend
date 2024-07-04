import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ver-resultados-test',
  templateUrl: './ver-resultados-test.component.html',
  styleUrls: ['./ver-resultados-test.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class VerResultadosTestComponent implements OnInit {
  resultados: any[] = [];
  idUsuario: number | null = null; // Inicializar idUsuario como null

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const storedIdUsuario = localStorage.getItem('idUsuario');
    if (storedIdUsuario) {
      this.idUsuario = parseInt(storedIdUsuario, 10);
      this.obtenerResultados();
    } else {
      console.error('No se ha establecido el idUsuario en localStorage.');
    }
  }

  obtenerResultados(): void {
    if (this.idUsuario !== null) {
      this.http.get<any[]>(`http://127.0.0.1:5000/api/resultados/by-user/${this.idUsuario}`).subscribe({
        next: (data) => {
          this.resultados = data;
          console.log('Resultados:', this.resultados);
        },
        error: (error) => {
          console.error('Error fetching results:', error);
        }
      });
    } else {
      console.error('No se ha establecido el idUsuario.');
    }
  }

  obtenerDiagnostico(puntos: number): string {
    if (puntos < 45) {
      return "ANSIEDAD NORMAL";
    } else if (puntos >= 45 && puntos <= 59) {
      return "ANSIEDAD MINIMA";
    } else if (puntos >= 60 && puntos <= 74) {
      return "ANSIEDAD MODERADA";
    } else {
      return "ANSIEDAD MAXIMA";
    }
  }

  obtenerColor(diagnostico: string): string {
    switch (diagnostico) {
      case "ANSIEDAD NORMAL":
        return "lightgreen";
      case "ANSIEDAD MINIMA":
        return "green";
      case "ANSIEDAD MODERADA":
        return "yellow";
      case "ANSIEDAD MAXIMA":
        return "red";
      default:
        return "white";
    }
  }
}
