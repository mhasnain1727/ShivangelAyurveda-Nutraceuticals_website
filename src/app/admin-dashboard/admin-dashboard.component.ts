import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [DatePipe]
})
export class AdminDashboardComponent implements OnInit {
  visitors: any[] = [];
  todayCount = 0;

  constructor(
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('admin_logged_in'));
    if (!localStorage.getItem('admin_logged_in')) {
      console.log('Not logged in, redirecting to login page');
      window.location.href = '/admin-login';
    }
    this.loadVisitors();
  }

  loadVisitors(): void {
    this.visitors =
      JSON.parse(localStorage.getItem('visitor_data') || '[]');

    const today = new Date().toDateString();
    this.todayCount = this.visitors.filter(v =>
      this.datePipe.transform(new Date(v.submittedAt), 'MM-dd-yyyy') === this.datePipe.transform(today, 'dd-MM-yyyy')
    ).length;

  }

  logout(): void {
    localStorage.removeItem('admin_logged_in');
    this.router.navigate(['/admin-login']);
  }

  clearAll(): void {
    if (confirm('Delete all visitor records?')) {
      localStorage.removeItem('visitor_data');
      this.visitors = [];
      this.todayCount = 0;
    }
  }

  exportToExcel(): void {
    if (!this.visitors.length) return;

    const header = Object.keys(this.visitors[0]).join(',');
    const rows = this.visitors.map(v =>
      Object.values(v).join(',')
    );

    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'visitor-data.csv';
    link.click();
  }
}
