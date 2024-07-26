import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { Gif, GiphyServiceResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private keyAPI: string = environment.giphy_API_key;
  private giphyUrl: string = 'https://api.giphy.com/v1';

  constructor(
    private http: HttpClient
  ) {
    this.loadLocalStorage()
   }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory( tag: string ) {

    tag = tag.toLowerCase();

    if ( this.tagsHistory.includes(tag) ) {
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag )
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0, 10);

    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem( 'history', JSON.stringify(this._tagsHistory ));
  }

  private loadLocalStorage(): void {
    if(!localStorage.getItem( 'history' )) return;

    this._tagsHistory = JSON.parse( localStorage.getItem( 'history' )! );

    if ( this._tagsHistory.length === 0 ) return;

    this.searchTag( this._tagsHistory[0] );
  }

  searchTag( tag: string ) {

    if (tag.length === 0) return;

    this.organizeHistory( tag );

    const params = new HttpParams()
      .set('api_key', this.keyAPI)
      .set('q', tag)
      .set('limit', 12)

    this.http.get<GiphyServiceResponse>(`${ this.giphyUrl }/gifs/search`, { params })
      .pipe(
        map( response =>  response.data ),
      )
      .subscribe( gifs => this.gifsList = gifs )
  }
}
