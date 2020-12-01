import { Routes } from '@angular/router';
import { ReactiveComponent } from './components/reactive/reactive/reactive.component';
import { HomeComponent } from './components/home/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { ShaderComponent } from './components/shader/shader.component';

export const routes: Routes = [
	{path: 'home', component: HomeComponent},
	{path: 'reactive', component: ReactiveComponent},
	{path: 'users', component: UsersComponent},
	{path: 'user/:id', component: UserComponent},
	{path: 'admin', component: AdminComponent},
	{path: 'shader', component: ShaderComponent},
	{path: '**', pathMatch: 'full', redirectTo: 'home'}
];