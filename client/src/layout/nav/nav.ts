import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  protected creds = {
    email: '',
    password: '',
  };

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (res) => {},
      error: (err) => console.error(err.message),
    });
  }

  logout() {
    this.accountService.logout();
  }
}
