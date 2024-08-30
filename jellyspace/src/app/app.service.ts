import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  apiURL = 'http://18.195.33.241:8080/api';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Update personal info method
  updatePersonalInfo(updatedInfo: {
    fname: string;
    lname: string;
    email: string;
    newPassword: string;
  }): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/updatePersonalInfo`,
        JSON.stringify(updatedInfo),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Send OTP method
  sendOTP(paramss: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/sendOTP`,
        JSON.stringify(paramss),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Verify OTP method
  verifyOTP(paramss: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/verifyOTP`,
        JSON.stringify(paramss),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Login method
  login(paramss: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/login`,
        JSON.stringify(paramss),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get employees method
  getEmployees(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}/employees`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get employee by ID method
  getEmployee(id: any): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}/employees/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Create employee method
  createEmployee(employee: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/register`,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Update employee method
  updateEmployee(id: any, employee: any): Observable<any> {
    return this.http
      .put<any>(
        `${this.apiURL}/employees/${id}`,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Delete employee method
  deleteEmployee(id: any): Observable<any> {
    return this.http
      .delete<any>(`${this.apiURL}/employees/${id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling method
  handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Get projects by email method
  getProjectByEmail(paramss: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/getProjects`,
        JSON.stringify(paramss),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Save post method
  savePostMethod(paramss: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/postAproject`,
        JSON.stringify(paramss),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get API data binding method
  getApiDataBinding(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}/projects`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get users data method
  getUsersData(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}/users`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get bid initialization details method
  getBidInitDetails(paramss: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/getProjectBids`,
        JSON.stringify(paramss),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get current bid details list method
  getCurrentBidDetailsList(paramss: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/getbids`,
        JSON.stringify(paramss),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Post bid method
  postBid(paramss: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/postBid`,
        JSON.stringify(paramss),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Accepted and rejected bids method
  acceptedAndRejected(paramss: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/acceptBid`,
        JSON.stringify(paramss),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Delete data method
  deleteData(id: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/deleteProject`,
        JSON.stringify(id),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Login user details method
  loginUserDetails(paramss: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/loginUser`,
        JSON.stringify(paramss),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Delete user method
  deleteUser(paramss: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/deleteUser`,
        JSON.stringify(paramss),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
}
