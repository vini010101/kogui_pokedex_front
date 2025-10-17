import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../core/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loginError = '';

  private loginService = inject(LoginService);
  private router = inject(Router);

  onSubmit() {
    this.loginService.login(this.username, this.password)
      .subscribe({
        next: () => {
          this.loginError = '';
          // Redireciona para /list
          this.router.navigate(['/list']);
        },
        error: (err) => {
          console.error('Erro no login:', err);
          this.loginError = 'Usuário ou senha inválidos.';
        }
      });
  }
}
