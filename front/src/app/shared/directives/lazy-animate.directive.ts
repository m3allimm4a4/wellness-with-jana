import { Directive, ElementRef, input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLazyAnimate]',
  standalone: true,
})
export class LazyAnimateDirective implements OnInit, OnDestroy {
  lazyAnimateClass = input<string>('');

  private observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.renderer.addClass(this.el.nativeElement, this.lazyAnimateClass());
        this.observer.unobserve(this.el.nativeElement);
      }
    });
  });

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
