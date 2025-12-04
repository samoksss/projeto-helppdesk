import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {

      const creds = this.loginForm.value;

      this.authService.authenticate(creds).subscribe(
        (response: HttpResponse<any>) => {

          // 🔥 Agora pegamos o token do HEADER
          const authHeader = response.headers.get('Authorization');

          if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            this.authService.sucessfulLogin(token);

            this.router.navigate(['home']);
          } else {
            alert('Erro: token não encontrado no servidor!');
          }
        },
        (error) => {
          console.error('Erro no login', error);
          alert('Email ou senha inválidos!');
        }
      );
    }
  }
}
