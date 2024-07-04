import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMap, MapHeatmapLayer } from '@angular/google-maps';

@Component({
  selector: 'app-mapa-calor',
  standalone: true,
  imports: [CommonModule, HttpClientModule, GoogleMap, MapHeatmapLayer],
  templateUrl: './mapa-calor.component.html',
  styleUrls: ['./mapa-calor.component.css']
})
export class MapaCalorComponent implements OnInit {
  resultados: any[] = [];
  heatmapData: any[] = []; // Arreglo para almacenar las coordenadas del mapa de calor

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerResultados();
    this.obtenerCoordenadas();
  }

  obtenerResultados(): void {
    this.http.get<any[]>('http://127.0.0.1:5000/api/resultados').subscribe({
      next: (data) => {
        this.resultados = data;
        console.log('Resultados:', this.resultados);
      },
      error: (error) => {
        console.error('Error fetching results:', error);
      }
    });
  }

  obtenerCoordenadas(): void {
    this.http.get<any[]>('http://127.0.0.1:5000/api/coordenadas').subscribe({
      next: (data) => {
        this.heatmapData = data.map(coordenada => ({
          lat: parseFloat(coordenada.y), // y es latitud
          lng: parseFloat(coordenada.x)  // x es longitud
        }));
        console.log('Coordenadas para el mapa de calor:', this.heatmapData);
      },
      error: (error) => {
        console.error('Error fetching coordinates:', error);
      }
    });
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

  center = { lat: -11.8464, lng: -77.1058 };
  zoom = 12;
  heatmapOptions = { radius: 20 };
}
