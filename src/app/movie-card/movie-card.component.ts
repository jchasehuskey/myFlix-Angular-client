
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';//Display notification

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  /**
   * This variables will receive and keep info from API calls bellow
   * @movies - keeps array of JSON objects (all movie avaliable in database)
   * @favorites - keeps array of favorite movies of specific user
   */
  movies: any[] = [];
  favorites: any[] = [];

  /**
   * @constructor is used to set dependencies. Constructor arguments then will be avaliable through "this" method
   * @param fetchApiData to use functions to make API call
   * @param dialog to call dialog with Genre, Director or Synopsis details
   * @param snackBar to show the message, that function succeded or throw error
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  // After implementing the function getMovies it is being called ngOnInit lifecycle hook
  // ngOnInit is called when Angular is done creating the component
  /**
   * This function calls specified methods automatically straight after Component was mounted
   * @function getMovies is called straight after component was mounted
   * @function getFavoriteMovies is called straight after component was mounted
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  

  /**
   * This function makes API call to get favorite movies of specific user
   * @function getFavoriteMovies
   * @returns array with movies id, which are included to the list of favorites
   */
  // getFavoriteMovies(): void {
  //   this.fetchApiData.getUser().subscribe((resp: any) => {
  //     this.favorites = resp.FavoriteMovies;
  //     console.log(this.favorites);
  //     return this.favorites;
  //   });
  // }

  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.favoriteMovies; // note the lowercase "f" in "favoriteMovies"
      console.log(this.favorites);
    });
  }
  

  /**
   * This function checks if movie is included to the list of favorites for specific user
   * @function isFavorite
   * @param id type of string - id of specific movie
   * @returns type of booleans (true or false)
   */
  // isFavorite(id: string): boolean {
  //   return this.favorites.includes(id);
  // }

  isFavorite(id: string): boolean {
    return this.favorites && this.favorites.includes(id);
  }
  

  /**
   * This function makes API call to add the movie to the list of favorite for specific user
   * @function addToFavorites
   * @param id type of string - id of specific movie
   */
  addToFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
  }

  /**
   * This function makes API call to delete the movie from the list of favorite for specific user
   * @function deleteFromFavorites
   * @param id type of string - id of specific movie
   */
  deleteFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie deleted from favorites', 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
  }

  /**
   * This function ma kes API call to get the full list of movies
   * @function getMovies
   * @returns array of JSON objects of all movies
   */
  getMovies(): void {
    // We make API call to get full list of movies
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      // we set movies variable to keep what we get as a response from API call
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * This function opens dialog with detailed information about specific Genre
   * @param name of specific Genre (comes from specific movie card)
   * @param description of specific Genre (comes from specific movie card)
   */
  openGenre(name: string, description: string): void {
    console.log(name);
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
    });
  }

  /**
   * This function opens dialog with detailed information about specific Director
   * @param name of specific Director (comes from specific movie card)
   * @param bio of specific Director (comes from specific movie card)
   * @param birth of specific Director (comes from specific movie card)
   */
  openDirector(name: string, bio: string, birth: string): void {
    console.log(name);
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
    });
  }

  /**
   * his function opens dialog with detailed information about specific Movie
   * @param title of specific Movie (comes from specific movie card)
   * @param movieDirector of specific Movie (comes from specific movie card)
   * @param movieGenre of specific Movie (comes from specific movie card)
   * @param movieDescription of specific Movie (comes from specific movie card)
   * @param movieImagePath of specific Movie (comes from specific movie card)
   */
  openSynopsis(
    title: string,
    movieDirector: string,
    movieGenre: string,
    movieDescription: string,
    movieImagePath: string
  ): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Director: movieDirector,
        Genre: movieGenre,
        Description: movieDescription,
        Image: movieImagePath,
      },
    });
  }

  
}

