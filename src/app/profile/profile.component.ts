import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // we declare variable as an object of type any
  // this variable will keep user info from API call (look getUser())
  /**
   * This variables will receive and keep info from API calls bellow
   * @user - keeps info about specific user
   * @movies - keeps array of JSON objects (all movie avaliable in database)
   * @favorites - keeps array of favorite movies of specific user
   */
  user: any = {};
  movies: any[] = [];
  favorites: any[] = [];

  /**
   * The updatedUser object will then be passed into the API call in the registerUser function.
   * @userData object contains: @Username (required), @Password (required), @Email (required), @Birthday (optional)
   */
  @Input() updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  /**
   * Constructor arguments then will be avaliable through "this" method
   * @param fetchApiData to use functions to make API call
   * @param router to navigate the user to welcome screen after deleting account
   * @param snackBar to show the message, that user has successfuly loged in
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  /**
   * This function calls specified methods automatically straight after Component was mounted
   */
  ngOnInit(): void {
    // this.getUser();
    this.getFavorites();
    this.getUser();
 
    
  }

  /**
   * This function makes an API call to get User info from database
   * @function getUser
   * @returns JSON object with user information
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      // we set user variable to keep what we get as a response from API call
      this.user = resp;
      // console.log(resp);
      this.updatedUser.Username = this.user.Username;
      this.updatedUser.Email = this.user.Email;
      this.updatedUser.Birthday = this.user.Birthday;
      return this.user;
      
    });
  }

  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.favoriteMovies;
      console.log(this.favorites);
    });
  }

  /**
   * This function makes an API call to delete user data for the user that is logged in, redirects user to the welcome view
   * @function deleteUser
   */
  deleteUser(): void {
    if (
      confirm(
        'You are going to delete your account FOREVER. All data will be lost. Are you sure?'
      )
    ) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account - we are sorry to see you go!',
          'OK',
          {
            duration: 4000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      });
    }
  }

  /**
   * This function makes an API call to update user data, such as username, password, email, or birthday
   * @function updateUserInfo
   */
  updateUserData(): void {
    this.fetchApiData.updateUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      this.snackBar.open('User profile was successfuly updated', 'OK', {
        duration: 4000,
      });
      localStorage.setItem('username', result.Username);
      window.location.reload();
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