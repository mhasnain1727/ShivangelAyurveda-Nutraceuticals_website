import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Shivangel Ayurveda & Nutraceuticals';
  isMenuOpen = false;
  currentYear = new Date().getFullYear();

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.isMenuOpen = false;
  }

  call(number: string): void {
    window.location.href = `tel:${number}`;
  }
}
