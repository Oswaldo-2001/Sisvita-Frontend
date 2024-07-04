import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  resultados: any[] = [];
  filtroTestId: number | null = null;
  filtroUsuarioId: number | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerResultados();
  }

  obtenerResultados(): void {
    this.http.get<any[]>('http://127.0.0.1:5000/api/resultados').subscribe({
      next: (data) => {
        this.resultados = data;
        console.log('Resultados:', this.resultados);
        this.resultados.forEach(resultado => {
          this.obtenerNumeroTelefono(resultado.id_usuario).then(numero => {
            resultado.numero = numero;
          });
        });
      },
      error: (error) => {
        console.error('Error fetching results:', error);
      }
    });
  }

  obtenerNumeroTelefono(idUsuario: number): Promise<string> {
    return this.http.get<any>(`http://127.0.0.1:5000/api/usuarios/${idUsuario}`).toPromise().then(data => {
      return data.numero;
    }).catch(error => {
      console.error(`Error fetching phone number for user ${idUsuario}:`, error);
      return '';
    });
  }

  filtrarPorTest(): void {
    if (this.filtroTestId !== null) {
      this.http.get<any[]>(`http://127.0.0.1:5000/api/resultados/by-test/${this.filtroTestId}`).subscribe({
        next: (data) => {
          this.resultados = data;
          console.log(`Resultados filtrados por test ${this.filtroTestId}:`, this.resultados);
          this.resultados.forEach(resultado => {
            this.obtenerNumeroTelefono(resultado.id_usuario).then(numero => {
              resultado.numero = numero;
            });
          });
        },
        error: (error) => {
          console.error(`Error fetching results for test ${this.filtroTestId}:`, error);
        }
      });
    }
  }

  filtrarPorUsuario(): void {
    if (this.filtroUsuarioId !== null) {
      this.http.get<any[]>(`http://127.0.0.1:5000/api/resultados/by-user/${this.filtroUsuarioId}`).subscribe({
        next: (data) => {
          this.resultados = data;
          console.log(`Resultados filtrados por usuario ${this.filtroUsuarioId}:`, this.resultados);
          this.resultados.forEach(resultado => {
            this.obtenerNumeroTelefono(resultado.id_usuario).then(numero => {
              resultado.numero = numero;
            });
          });
        },
        error: (error) => {
          console.error(`Error fetching results for user ${this.filtroUsuarioId}:`, error);
        }
      });
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

  generarWhatsAppUrl(numero: string, diagnostico: string): string {
    const mensaje = `Su diagnóstico fue de ${diagnostico}`;
    return `https://web.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;
  }
}
