import { Component, AfterViewInit, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements AfterViewInit {
  year = new Date().getFullYear();
  navShadow = false;
  menuOpen = false;

  ngAfterViewInit(): void {
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const AOS = (window as any).AOS;
    if (AOS && !prefersReduce) {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        offset: 80,
        once: true,
      });
      AOS.refreshHard();
    }
  }

  scrollTo(id: string, event?: Event): void {
    if (event) event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }



  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.navShadow = (window.scrollY || window.pageYOffset) > 4;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768 && this.menuOpen) this.menuOpen = false;
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(ev: KeyboardEvent): void {
    if (ev.key === 'Escape' && this.menuOpen) this.menuOpen = false;
  }
}
