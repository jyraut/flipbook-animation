import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

@Component({
  selector: 'app-flipbook-animation',
  templateUrl: './flipbook-animation.component.html',
  styleUrls: ['./flipbook-animation.component.scss'],
})
export class FlipbookAnimationComponent {
  @ViewChild('book', { static: true }) bookRef!: ElementRef;
  pdfSrc = 'assets/NoTailCat.pdf';
  currentStep = 0;
  totalPages = 0;
  pages: HTMLElement[] = [];

  constructor(private renderer: Renderer2) {
    GlobalWorkerOptions.workerSrc = 'assets/pdfjs/pdf.worker.min.js';
  }

  async ngAfterViewInit() {
    const pdf = await getDocument(this.pdfSrc).promise;
    this.totalPages = pdf.numPages;

    const isMobile = window.innerWidth <= 768;

    for (let i = 1; i <= this.totalPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.3 });

      const canvas = this.renderer.createElement('canvas') as HTMLCanvasElement;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: canvas.getContext('2d')!, viewport })
        .promise;

      const wrapper = this.renderer.createElement('div');
      this.renderer.addClass(wrapper, 'paper');
      wrapper.appendChild(canvas);

      this.renderer.appendChild(this.bookRef.nativeElement, wrapper);

      if (i === 1) {
        this.renderer.addClass(wrapper, 'visible');
      }

      this.pages.push(wrapper);
    }

    this.applyInitialZIndices();
  }

  onBookClick(event: MouseEvent) {
    const isMobile = window.innerWidth <= 768;
    const bookElement = this.bookRef.nativeElement;
    const clickX = event.clientX - bookElement.getBoundingClientRect().left;
    const bookWidth = bookElement.offsetWidth;

    const isForward = clickX > bookWidth / 2;
    const isBackward = clickX <= bookWidth / 2;

    this.renderer.removeClass(bookElement, 'started');
    this.renderer.removeClass(bookElement, 'end');

    if (isMobile) {
      if (isForward && this.currentStep < this.pages.length) {
        if (!this.pages[this.currentStep].parentElement) {
          this.renderer.appendChild(bookElement, this.pages[this.currentStep]);
        }
        void this.pages[this.currentStep].offsetWidth;

        this.pages[this.currentStep].classList.add('flipped', 'visible');
        this.currentStep++;
      } else if (isBackward && this.currentStep > 0) {
        this.currentStep--;
        this.pages[this.currentStep].classList.remove('flipped');
        setTimeout(() => {
          this.pages[this.currentStep].classList.remove('visible');
        }, 300);
      }
    } else {
      if (isForward && this.currentStep < this.pages.length - 1) {
        const leftPage = this.pages[this.currentStep];
        const rightPage = this.pages[this.currentStep + 1];

        if (!leftPage.parentElement) {
          this.renderer.appendChild(bookElement, leftPage);
        }
        if (rightPage && !rightPage.parentElement) {
          this.renderer.appendChild(bookElement, rightPage);
        }

        void leftPage.offsetWidth;

        leftPage.classList.add('flipped', 'visible');
        if (rightPage) {
          rightPage.classList.add('flipped', 'visible');
        }

        this.currentStep += 2;
      } else if (isBackward && this.currentStep >= 2) {
        this.currentStep -= 2;
        const leftPage = this.pages[this.currentStep];
        const rightPage = this.pages[this.currentStep + 1];

        leftPage.classList.remove('flipped');
        if (rightPage) {
          rightPage.classList.remove('flipped');
        }

        setTimeout(() => {
          leftPage.classList.remove('visible');
          if (rightPage) {
            rightPage.classList.remove('visible');
          }
        }, 300);
      }
    }

    if (this.currentStep === 0) {
      this.renderer.addClass(bookElement, 'end');
    } else {
      this.renderer.addClass(bookElement, 'started');
    }
  }

  applyInitialZIndices() {
    const count = this.pages.length;
    for (let i = 0; i < count; i++) {
      this.pages[i].style.zIndex = `${count - i}`;
    }
  }
}
