import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interface/gifs.interfaces';
@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private giphy_api: string = "wK4ddnY5KVgeNqMYiUndqSPE6c4efWQA"
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'
  public gifsList: Gif[] = [];
  private _tagHistory: string[] = [];
  constructor(private http: HttpClient) {
this.loadLocalStorahe()
  }
  get tagsHistory() {
    return [...this._tagHistory]
  }
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((element) => element !== tag)
    }
    this._tagHistory.unshift(tag)
    this._tagHistory = this._tagHistory.splice(0, 10)
    this.saveLocalStorage()

  }
  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key', this.giphy_api)
      .set('limit', 50)
      .set('q', tag)
    this.http.get<SearchResponse>(this.serviceUrl + '/search', { params: params })
      .subscribe((res) => {
        this.gifsList = res.data
        console.log({ gifs: this.gifsList });


      })
  }
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory))
  }
  private loadLocalStorahe():void{
    
    if(!localStorage.getItem('history')) return 
      this._tagHistory=JSON.parse(localStorage.getItem('history')!)
    if(this.tagsHistory.length===0)return
    this.searchTag(this._tagHistory[0])
  }
  




}
