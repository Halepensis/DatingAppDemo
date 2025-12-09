import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { Nav } from '../layout/nav/nav';
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private http = inject(HttpClient);
  protected router = inject(Router);
  protected readonly title = signal('Dating App');
  protected members: Signal<User[]> = toSignal(
    this.http.get<User[]>('https://localhost:5001/api/members'),
    {
      initialValue: [],
    }
  );
}
