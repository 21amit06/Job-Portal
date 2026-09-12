import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl =
    'http://localhost:3000/api/users';


  constructor(
    private http: HttpClient
  ) {}


  // =========================
  // REGISTER
  // =========================

  register(user: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      user
    );

  }


  // =========================
  // LOGIN
  // =========================

  login(user: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      user
    );

  }


  // =========================
  // SAVE LOGIN DATA
  // =========================

  saveLoginData(result: any): void {

    localStorage.setItem(
      'token',
      result.token
    );


    localStorage.setItem(
      'user',
      JSON.stringify(result.user)
    );

  }





//   getMyProfile() {
//   return this.http.get(`${this.apiUrl}/profile`);
// }


getMyProfile(): Observable<any> {

  return this.http.get(
    `${this.apiUrl}/my-profile`
  );

}

  // =========================
  // GET TOKEN
  // =========================

  getToken(): string | null {

    return localStorage.getItem(
      'token'
    );

  }


  // =========================
  // GET USER
  // =========================

  getUser(): any {

    const user =
      localStorage.getItem('user');


    if (!user) {

      return null;

    }


    return JSON.parse(user);

  }


  // =========================
  // GET USER TYPE
  // =========================

  getUserType(): string | null {

    const user =
      this.getUser();


    if (!user) {

      return null;

    }


    return user.user_type;

  }


  // =========================
  // LOGOUT
  // =========================

  logout(): void {

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'user'
    );

  }


  // =========================
  // CHECK LOGIN
  // =========================

  isLoggedIn(): boolean {

    return !!this.getToken();

  }
}
