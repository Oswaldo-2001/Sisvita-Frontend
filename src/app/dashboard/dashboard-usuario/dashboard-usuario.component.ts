import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard-usuario.component.html',
  styleUrls: ['./dashboard-usuario.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardUsuarioComponent {
  user: any = { nombre_perfil: 'Usuario' }; // Simulación de usuario
  isMenuOpen: { [key: string]: boolean } = { test: false };

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      localStorage.setItem('idUsuario', this.user.id_usuario); // Guardar idUsuario en localStorage
    }
  }

  toggleMenu(menu: string): void {
    this.isMenuOpen[menu] = !this.isMenuOpen[menu];
  }

  navigateTo(route: string): void {
    this.router.navigate([`dashboard_usuario/${route}`]);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('idUsuario'); // Limpiar idUsuario al cerrar sesión
    this.router.navigateByUrl('/login');
  }
}
