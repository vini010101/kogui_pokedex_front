import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../core/services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  registerError = '';

  private registerService = inject(RegisterService);
  private router = inject(Router);

  onSubmit() {
    this.registerService.register(this.username, this.email, this.password)
      .subscribe({
        next: () => {
          this.registerError = '';
          this.router.navigate(['/login']); // redireciona após sucesso
        },
        error: err => {
          console.error('Erro no registro:', err);
          this.registerError = err.error.detail || 'Erro ao registrar usuário.';
        }
      });
  }
}
