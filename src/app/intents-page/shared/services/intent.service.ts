import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../login/auth.service';

@Injectable()
export class IntentService {
  constructor(
    public http: HttpClient,
    public authService: AuthService
  ) {}

  public getIntents(chatbotId, pageNum, size, searchStr): Observable<any> {
    return this.http.get<HttpResponse<any>>
    (`backend/api/chatbot/${chatbotId}${environment.api.intent.url}?pageNumber=${pageNum}
    &size=${size}&description=${searchStr}`);
  }

  public addIntent(chatbotId, data): Observable<any> {
    return this.http.post<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.intent.url}`, data);
  }

  public deleteIntent(chatbotId, id): Observable<any> {
    return this.http.delete<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.intent.url}/${id}`);
  }

  public updateIntent(chatbotId, data): Observable<any> {
    return this.http.put<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.intent.url}`, data);
  }

  public getIntentByName(chatbotId, intentName): Observable<any> {
    return this.http.get<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.intent.url}/${intentName}`);
  }

  public addExample(chatbotId, intentName, data): Observable<any> {
    return this.http.post<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.intent.url}/${intentName}/example`, data);
  }

  public addResponse(chatbotId, intentName, data): Observable<any> {
    return this.http.post<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.intent.url}/${intentName}/response`, data);
  }

  public getIntentsNames(chatbotId): Observable<any> {
    return this.http.get<HttpResponse<any>> (`backend/api/chatbot/${chatbotId}${environment.api.intent.url}`);
  }
}
