import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private http = inject(HttpClient);
  protected readonly title = signal('Dating App');
  protected members: Signal<any[]> = toSignal(
    this.http.get<any[]>('https://localhost:5001/api/members'),
    {
      initialValue: [],
    }
  );
}
