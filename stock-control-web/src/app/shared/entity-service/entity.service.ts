import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_URL } from 'src/app/app-contants';

export class EntityService<T> {
  public resourceUrl;

  constructor(protected http: HttpClient, private entityUrl: string) {
    this.resourceUrl = SERVER_URL + 'api/' + entityUrl;
  }

  create(entity: T): Observable<HttpResponse<T>> {
    return this.http
      .post<T>(this.resourceUrl, entity, { observe: 'response' });
  }

  update(entity: T): Observable<HttpResponse<T>> {
    return this.http
      .put<T>(this.resourceUrl, entity, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<T>> {
    return this.http
      .get<T>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<T[]>> {
    const options = createRequestParams(req);
    return this.http
      .get<T[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  
}

export const createRequestParams = function(req?: any): HttpParams {
    let params: HttpParams = new HttpParams();
    if(req) {
        Object.keys(req).forEach(key => {
            if (key !== 'sort' && req[key] != null) {
                params = params.set(key, req[key]);
            }
        });
    
        if (req.sort) {
            req.sort.forEach((val: string) => {
                params = params.append('sort', val);
            });
        }
    }
    return params;
}