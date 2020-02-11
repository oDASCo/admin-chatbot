import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable()
export class ConversationService {
  constructor(
    public http: HttpClient
  ) {}

  public getConversations(chatbotId): Observable<any> {
    return this.http.get<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.reports.url}`);
  }

  public getConversationsByLevel(chatbotId, filterOptions): Observable<any> {
    const params = new HttpParams()
      .set('confidenceLevelEndInclusive', filterOptions.confidenceLevelEnd)
      .set('confidenceLevelStartInclusive', filterOptions.confidenceLevelStart);
    return this.http.get<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.reports.url}`, {params});
  }

  public getConversationsByIntents(chatbotId, filterOptions): Observable<any> {
    let params = new HttpParams();
    filterOptions.intentNames.forEach(id => {
      params = params.append('intentName', id);
    });
    return this.http.get<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.reports.url}`, {params});
  }

  public getConversationsByDate(chatbotId, filterOptions): Observable<any> {
    const params = new HttpParams()
      .set('startDate', filterOptions.startDate)
      .set('endDate', filterOptions.endDate);
    return this.http.get<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.reports.url}`, {params});
  }

  public getConversationBySessionId(chatbotId, id): Observable<any> {
    return this.http.get<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.reports.url}/${id}`);
  }

  public updateIntentName(chatbotId, data): Observable<any> {
    return this.http.put<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.reports.url}/message/intent`, data);
  }

  public getConversationsIntentNames(chatbotId): Observable<any> {
    return this.http.get<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.reports.url}/intent/names`);
  }
}
