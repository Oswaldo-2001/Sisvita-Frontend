import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule] 
})
export class RegistroUsuarioComponent {
  registroUsuarioObj = { 
    id_usuario: '0',
    nombre_perfil: '', 
    correo: '', 
    contrasenna: '', 
    fecha_nacimiento: '', 
    numero: '', 
    ubigeo: '' 
  };

  constructor(private http: HttpClient, private router: Router) {}

  onRegistroUsuario() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log('Sending these credentials:', this.registroUsuarioObj);
    this.http.post('http://127.0.0.1:5000/api/usuarios/add', this.registroUsuarioObj, httpOptions).subscribe({
      next: (response: any) => {
        console.log('Response from server:', response);
        alert("Usuario registrado correctamente");
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error('Registro error:', error);
        alert("Error: " + (error.error.message || "Unknown Error"));
      }
    });
  }
}
