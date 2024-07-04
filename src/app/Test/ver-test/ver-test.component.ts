import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-test',
  templateUrl: './ver-test.component.html',
  styleUrls: ['./ver-test.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class VerTestComponent implements OnInit {
  tests: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://127.0.0.1:5000/api/tests').subscribe({
      next: (data) => {
        this.tests = data;
        console.log('Tests:', this.tests);
      },
      error: (error) => {
        console.error('Error fetching tests:', error);
      }
    });
  }

  startTest(test: any): void {
    console.log('Starting test:', test);

    // Primero, hacemos el POST a /test_tomado_temporal/add
    this.http.post('http://127.0.0.1:5000/api/test_tomado_temporal/add', {
      id_test_tomado_temporal: 0
    }).subscribe({
      next: () => {
        // Luego, hacemos el GET a /test_tomado_temporal/last
        this.http.get('http://127.0.0.1:5000/api/test_tomado_temporal/last').subscribe({
          next: (data: any) => {
            const idTestTomadoTemporal = data.id_test_tomado_temporal;
            // Navegamos a la ruta para tomar el test con el idTestTomadoTemporal
            this.router.navigateByUrl(`/dashboard_usuario/test-tomar/${test.id_test}?temp_id=${idTestTomadoTemporal}`);
          },
          error: (error) => {
            console.error('Error fetching last test tomado temporal:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error creating test tomado temporal:', error);
      }
    });
  }
}
