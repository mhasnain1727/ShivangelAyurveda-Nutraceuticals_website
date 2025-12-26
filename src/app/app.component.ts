import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  isImageOpen = false;
  activeImage = '';


  title = 'Shivangel Ayurveda & Nutraceuticals';
  isMenuOpen = false;
  currentYear = new Date().getFullYear();

  heroMedia = [
    {
      type: 'image',
      src: 'assets/media/img1.jpeg',
      alt: 'Manufacturing Facility'
    },
    {
      type: 'image',
      src: 'assets/media/img2.jpeg',
      alt: 'Quality Control Lab'
    },
    {
      type: 'video',
      src: 'assets/media/achievement-video.mp4'
    },
    {
      type: 'image',
      src: 'assets/media/img3.jpeg',
      alt: 'Quality Control Lab'
    },
  ];

  activeMediaIndex = 0;
  private mediaInterval!: any;
  private slideTimeout: any;


  ngOnInit(): void {
    // this.mediaInterval = setInterval(() => {
    //   this.activeMediaIndex =
    //     (this.activeMediaIndex + 1) % this.heroMedia.length;
    // }, 5000);
    this.startSlideTimer();
  }

  ngOnDestroy(): void {
    // clearInterval(this.mediaInterval);
    clearTimeout(this.slideTimeout);
  }

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

  openImage(src: string): void {
    this.activeImage = src;
    this.isImageOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeImage(): void {
    this.isImageOpen = false;
    this.activeImage = '';
    document.body.style.overflow = '';
  }

  /* IMAGE → 5 seconds */
  startSlideTimer(): void {
    clearTimeout(this.slideTimeout);

    const media = this.heroMedia[this.activeMediaIndex];

    // if (media.type === 'image') {
    if (media.type === 'image' || media.type === 'video') {
      this.slideTimeout = setTimeout(() => {
        this.goToNextSlide();
      }, 5000);
    }
  }

  /* FORCE mute + autoplay (browser safe) */
  onVideoLoaded(video: HTMLVideoElement): void {
    video.muted = true;
    video.loop = true;
    // video.volume = 0;
    // video.autoplay = true;
    // video.currentTime = 0;

    // const playPromise = video.play();
    // if (playPromise !== undefined) {
    //   playPromise.catch(() => {
    //     // autoplay blocked – user must click play
    //   });
    // }
  }

  /* VIDEO → next slide ONLY when ended */
  onVideoEnded(): void {
    this.goToNextSlide();
  }

  goToNextSlide(): void {
    this.activeMediaIndex =
      (this.activeMediaIndex + 1) % this.heroMedia.length;

    this.startSlideTimer();
  }

}

