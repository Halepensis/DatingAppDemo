import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';
import { User } from '../types/user';
import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected readonly title = signal('Dating App');
  protected members: Signal<User[]> = toSignal(
    this.http.get<User[]>('https://localhost:5001/api/members'),
    {
      initialValue: [],
    }
  );
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}
