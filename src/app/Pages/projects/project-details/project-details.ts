import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface ProjectData {
  title: string;
  description: string;
  category: string;
  duration: string;
  location: string;
  gallery: string[];
  hero?: string;
  client?: string;
  date?: string;
  technologies?: string[];
  intro?: string;
  features?: { icon: string; title: string; desc: string }[];
  results?: { label: string; value: string }[];
}

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-details.html',
  styleUrls: ['./project-details.scss']
})
export class ProjectDetails implements AfterViewInit {
  data: ProjectData;

  constructor(private route: ActivatedRoute, private router: Router) {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    const map: Record<string, ProjectData> = {
      'industrial-piping': {
        title: 'Industrial Piping & Welding',
        description: 'Certified welders and pipefitters delivering new process lines with precise shutdown windows and safety-first execution.',
        category: 'Welding / Piping',
        duration: '8 weeks',
        location: 'Industrial Plant',
        gallery: [
          'https://images.pexels.com/photos/2965260/pexels-photo-2965260.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/8961067/pexels-photo-8961067.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/7358698/pexels-photo-7358698.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]
      },
      'residential-finishing': {
        title: 'Premium Residential Finishing',
        description: 'Showroom-grade interiors, precision paintwork, custom joinery and immaculate handover across multiple sites.',
        category: 'Finishing / Carpentry',
        duration: '6 weeks',
        location: 'Residential Towers',
        gallery: [
          'https://images.pexels.com/photos/3997159/pexels-photo-3997159.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/5854198/pexels-photo-5854198.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/3862370/pexels-photo-3862370.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]
      },
      'hvac-electrical-upgrade': {
        title: 'HVAC & Electrical Upgrade',
        description: 'End-to-end riser replacement, panel upgrades and mechanical commissioning in occupied commercial spaces.',
        category: 'HVAC / Electrical',
        duration: '10 weeks',
        location: 'Commercial Tower',
        gallery: [
          'https://images.pexels.com/photos/5854198/pexels-photo-5854198.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/8961067/pexels-photo-8961067.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/2965260/pexels-photo-2965260.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]
      },
      'commercial-fitout': {
        title: 'Commercial Fit-Out',
        description: 'Electrical, carpentry and finishing delivered under tight schedules with minimal disruption to operations.',
        category: 'Fit-Out / Multi-Trade',
        duration: '12 weeks',
        location: 'City Business District',
        gallery: [
          'https://images.pexels.com/photos/3862370/pexels-photo-3862370.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/3997159/pexels-photo-3997159.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/2965260/pexels-photo-2965260.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]
      },
      'facility-maintenance': {
        title: 'Facility Maintenance Program',
        description: 'Multi-trade preventive and reactive maintenance with clear SLAs and reporting transparency.',
        category: 'Maintenance / Multi-Trade',
        duration: 'Ongoing',
        location: 'Nationwide',
        gallery: [
          'https://images.pexels.com/photos/7358698/pexels-photo-7358698.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/5854198/pexels-photo-5854198.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/8961067/pexels-photo-8961067.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]
      },
      'industrial-steelwork': {
        title: 'Industrial Steelwork',
        description: 'Certified structural fabrication and installation completed to specification and QA standards.',
        category: 'Structural / Steelwork',
        duration: '14 weeks',
        location: 'Industrial Zone',
        gallery: [
          'https://images.pexels.com/photos/8961067/pexels-photo-8961067.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/2965260/pexels-photo-2965260.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/3862370/pexels-photo-3862370.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]
      }
    };

    const fallback: ProjectData = {
      title: 'Project',
      description: 'Detailed view of a featured project delivered by our certified teams.',
      category: 'General',
      duration: '—',
      location: '—',
      gallery: [
        'https://images.pexels.com/photos/3862370/pexels-photo-3862370.jpeg?auto=compress&cs=tinysrgb&w=1600'
      ]
    };

    this.data = map[slug] || fallback;
    if (!this.data.hero) this.data.hero = this.data.gallery[0];
    if (!this.data.intro) this.data.intro = this.data.description;
    if (!this.data.technologies) this.data.technologies = ['Angular', 'Node.js', 'PostgreSQL'];
    if (!this.data.features) this.data.features = [
      { icon: '🔐', title: 'User Authentication', desc: 'Secure login and role-based access.' },
      { icon: '📊', title: 'Admin Dashboard', desc: 'KPIs, charts and management tools.' },
      { icon: '🔔', title: 'Real-Time Notifications', desc: 'Live updates and alerts.' },
      { icon: '💳', title: 'Payment Integration', desc: 'Seamless online payments and invoicing.' },
      { icon: '🌐', title: 'Multi-language Support', desc: 'Localized UI and content.' }
    ];
    if (!this.data.results) this.data.results = [
      { label: 'Performance', value: '+45%' },
      { label: 'User Adoption', value: '3x' },
      { label: 'Downtime', value: '-60%' }
    ];
    if (!this.data.date) this.data.date = '—';
    if (!this.data.client) this.data.client = '—';
  }

  ngAfterViewInit(): void {
    const els = document.querySelectorAll<HTMLElement>('[data-animate]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('in');
          io.unobserve(e.target);
        }
      })
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
  }

  goBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate(['/home']);
    }
  }
}
