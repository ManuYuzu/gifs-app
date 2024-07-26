import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(
    private gifService: GifsService
  ) { }

  get tagsHistory() {
    return this.gifService.tagsHistory;
  }

  searchTag( tag: string ) {

    this.gifService.searchTag( tag );

  }

}