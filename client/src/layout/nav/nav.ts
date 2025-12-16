import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginCreds } from '../../types/user';
import { ToastService } from '../../core/services/toast-service';
import { themes } from '../theme';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  protected accountService = inject(AccountService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  protected selectedTheme = signal<string>(localStorage.getItem('theme') ?? 'light');
  protected themes = themes;

  protected creds: LoginCreds = {
    email: '',
    password: '',
  };

  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }

  handleSelectTheme(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const elem = document.activeElement as HTMLDivElement;
    if (elem) elem.blur();
  }
  login() {
    this.accountService.login(this.creds).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/members');
        console.log(res);
        this.toastService.success('Logged in successfully');
      },
      error: (err) => {
        console.log(err);
        this.toastService.error(err.error);
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
