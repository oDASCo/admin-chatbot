import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  public activationCode: string;
  public user: any;
  public chatbots: any;

  constructor(
    public http: HttpClient
  ) {}

  public login(user): Observable<any> {
    return this.http
      .post<HttpResponse<any>>(`${environment.api.auth.login.url}`, user, {observe: 'response'});
  }

  public signUp(user): Observable<any> {
    return this.http
      .post<HttpResponse<any>>(environment.api.auth.register.url, user, {observe: 'response'});
  }

  public logout(): Observable<any> {
    return this.http.get<HttpResponse<any>>(environment.api.auth.logout.url);
  }

  public activateEmail(): Observable<any> {
    return this.http.get<HttpResponse<any>>(environment.api.auth.register.activateEmail.url + this.activationCode);
  }

  public changePassword(data): Observable<any> {
    return this.http.put<HttpResponse<any>>(environment.api.auth.changePassword.url, data);
  }

  public setChatbot(chatbotId, data): Observable<any> {
    return this.http.put<HttpResponse<any>>(environment.api.chatbot.url + `/${chatbotId}`, data);
  }

  public createChatbot(chatbotName): Observable<any> {
    return this.http.post<HttpResponse<any>>(environment.api.chatbot.create.url + `/${chatbotName}`, chatbotName);
  }

  get isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
  set isLoggedIn(isAuth) {
    this.isAuthenticated = isAuth;
  }
}
