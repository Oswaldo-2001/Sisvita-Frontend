import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-especialista',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-especialista.component.html',
  styleUrls: ['./dashboard-especialista.component.css']
})
export class DashboardEspecialistaComponent {
  user: any = { nombre_perfil: 'Especialista' };

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([`dashboard_especialista/${route}`]);
  }

  logout(): void {
    this.router.navigateByUrl('/login');
  }
}
