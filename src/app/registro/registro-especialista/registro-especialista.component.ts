import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule] 
})
export class RegistroEspecialistaComponent {
  registroEspecialistaObj = {
    id_especialista: '0', 
    nombre_perfil: '', 
    correo: '', 
    contrasenna: '', 
    dni: '', 
    nombres: '', 
    apellidos: '', 
    numero_colegiatura: '' 
  };

  constructor(private http: HttpClient, private router: Router) {}

  onRegistroEspecialista() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log('Sending these credentials:', this.registroEspecialistaObj);
    this.http.post('http://127.0.0.1:5000/api/especialistas/add', this.registroEspecialistaObj, httpOptions).subscribe({
      next: (response: any) => {
        console.log('Response from server:', response);
        alert("Especialista registrado correctamente");
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error('Registro error:', error);
        alert("Error: " + (error.error.message || "Unknown Error"));
      }
    });
  }
}
