import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tomar-test',
  templateUrl: './tomar-test.component.html',
  styleUrls: ['./tomar-test.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class TomarTestComponent implements OnInit {
  test: any = {
    nombre: '',
    descripcion: ''
  };
  preguntas: any[] = [];
  opciones: string[] = ['Casi nunca', 'Alguna vez', 'A menudo', 'Muy a menudo'];
  respuestas: number[] = [];
  idTestTomadoTemporal!: number;
  idUsuario: number = 0; // Inicializar con un valor predeterminado
  ubigeoUsuario: string = ''; // Variable para almacenar el ubigeo del usuario

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const idTest = this.route.snapshot.paramMap.get('id');
    this.idTestTomadoTemporal = Number(this.route.snapshot.queryParamMap.get('temp_id'));
    this.obtenerTest(idTest);
    this.obtenerPreguntas(idTest);
    this.obtenerUsuarioLogueado();
  }

  obtenerUsuarioLogueado(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const usuario = JSON.parse(user);
      this.idUsuario = usuario.id_usuario;
      this.ubigeoUsuario = usuario.ubigeo; // Asignar el ubigeo del usuario logueado
    } else {
      // Redirigir al login si no hay usuario en el localStorage
      this.router.navigateByUrl('/login');
    }
  }

  obtenerTest(id: string | null): void {
    this.http.get(`http://127.0.0.1:5000/api/tests/${id}`).subscribe((data: any) => {
      this.test = data;
    });
  }

  obtenerPreguntas(id: string | null): void {
    this.http.get(`http://127.0.0.1:5000/api/preguntas/test/${id}`).subscribe((data: any) => {
      this.preguntas = data;
      this.respuestas = new Array(this.preguntas.length).fill(0);
    });
  }

  seleccionarRespuesta(preguntaIndex: number, opcion: number): void {
    this.respuestas[preguntaIndex] = opcion;
    console.log('Respuestas actuales:', this.respuestas);
  }

  submitTest(): void {
    if (this.respuestas.includes(0)) {
      alert('Debe responder todas las preguntas antes de enviar el test.');
      return;
    }

    const requests = this.preguntas.map((pregunta, index) => {
      const respuesta = {
        id_respuesta: 0,
        id_usuario: this.idUsuario,
        id_test_tomado_temporal: this.idTestTomadoTemporal,
        id_pregunta: 15, // Utilizar el ID real de la pregunta
        id_test: this.test.id_test,
        valor: this.respuestas[index]
      };
      console.log('Enviando respuesta:', respuesta);
      return this.http.post('http://127.0.0.1:5000/api/respuestas/add', respuesta).toPromise();
    });

    Promise.all(requests).then(() => {
      const resultado = {
        id_resultado: 0,
        id_usuario: this.idUsuario,
        id_test: this.test.id_test,
        id_test_tomado_temporal: this.idTestTomadoTemporal
      };

      console.log('Enviando resultado:', resultado);
      this.http.post('http://127.0.0.1:5000/api/resultados/add', resultado).subscribe({
        next: () => {
          alert('Test enviado exitosamente.');

          // Enviar coordenada
          const coordenada = {
            id_coordenada: 0, // Siempre 0 según especificaciones
            ubigeo: this.ubigeoUsuario // Usar el ubigeo del usuario logueado
          };

          this.http.post('http://127.0.0.1:5000/api/coordenadas/add', coordenada).subscribe({
            next: () => {
              alert('Coordenada enviada exitosamente.');
              this.router.navigateByUrl('/dashboard_usuario');
            },
            error: (error) => {
              console.error('Error enviando coordenada:', error);
              alert('Error enviando coordenada.');
            }
          });
        },
        error: (error) => {
          console.error('Error creating result:', error);
          alert('Error enviando resultado.');
        }
      });
    }).catch((error) => {
      console.error('Error sending responses:', error);
      alert('Error enviando respuestas.');
    });
  }
}
