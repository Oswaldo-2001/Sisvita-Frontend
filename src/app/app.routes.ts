import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardUsuarioComponent } from './dashboard/dashboard-usuario/dashboard-usuario.component';
import { DashboardEspecialistaComponent } from './dashboard/dashboard-especialista/dashboard-especialista.component';
import { RegistroUsuarioComponent } from './registro/registro-usuario/registro-usuario.component';
import { RegistroEspecialistaComponent } from './registro/registro-especialista/registro-especialista.component';
import { VerTestComponent } from './Test/ver-test/ver-test.component';
import { TomarTestComponent } from './Test/tomar-test/tomar-test.component';
import { VerResultadosTestComponent } from './Test/ver-resultados-test/ver-resultados-test.component';
import { MapaCalorComponent } from './mapa-calor/mapa-calor.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard_usuario',
    component: DashboardUsuarioComponent,
    children: [
      { path: 'test-lista', component: VerTestComponent },
      { path: 'test-tomar/:id', component: TomarTestComponent },
      { path: 'test-resultados', component: VerResultadosTestComponent }
    ]
  },
  {
    path: 'dashboard_especialista',
    component: DashboardEspecialistaComponent,
    children: [
      { path: 'mapa-calor', component: MapaCalorComponent }, // Asegúrate de crear el componente correspondiente
      // Puedes agregar más rutas específicas para el especialista si es necesario
    ]
  },
  { path: 'registro_usuario', component: RegistroUsuarioComponent },
  { path: 'registro_especialista', component: RegistroEspecialistaComponent },
];
