import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styles: ``
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url: string | undefined;
  @Input()
  public alt: string = 'No alt found';

  hasLoaded: boolean = false;

  constructor() {}

    ngOnInit(): void {
    if (!this.url) throw new Error('Gif not found');
    if (!this.alt) throw new Error('Alt not found');
  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 500)
  }
}
