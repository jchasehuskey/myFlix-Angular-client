import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoriteMoviesComponent {

  constructor(private http: HttpClient) { }

  getUserFavoriteMovies(userId: string) {
    return this.http.get<any[]>(`http://yourbackendserver.com/api/users/${userId}/favorite-movies`);
  }
}