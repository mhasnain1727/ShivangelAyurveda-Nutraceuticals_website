import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('admin_logged_in');
  }

  login(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      localStorage.setItem('admin_logged_in', 'true');
      console.log('Login successful');
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/admin-dashboard']);
      this.error = 'Invalid username or password';
    }
  }
}
