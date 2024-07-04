import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule]  // Ensure HttpClientModule and RouterModule are imported here
})
export class LoginComponent {
  loginObj = { correo: '', contrasenna: '' };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log('Sending these credentials:', this.loginObj);
    this.http.post<any>('http://127.0.0.1:5000/api/login', this.loginObj, httpOptions).subscribe({
      next: (response) => {
        console.log('Response from server:', response);
        if (response.message === "Credenciales incorrectas") {
          alert("Credenciales incorrectas. Por favor, intente nuevamente.");
        } else {
          localStorage.setItem('user', JSON.stringify(response.usuario));
          if (response.message === "Bienvenido Usuario") {
            localStorage.setItem('idUsuario', response.usuario.id_usuario.toString());
            this.router.navigateByUrl('/dashboard_usuario');
          } else if (response.message === "Bienvenido Especialista") {
            this.router.navigateByUrl('/dashboard_especialista');
          }
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        alert("Error: " + (error.error.message || "Unknown Error"));
      }
    });
  }

  registrarUsuario() {
    this.router.navigateByUrl('/registro_usuario');
  }

  registrarEspecialista() {
    this.router.navigateByUrl('/registro_especialista');
  }
}
