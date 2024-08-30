import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BlogPost } from '../interfaces/blog.model';

interface ApiResponse {
  statusCode: number;
  message: string;
  post: BlogPost[];
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<BlogPost[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => {
        if (response && response.post && Array.isArray(response.post)) {
          return response.post;
        } else {
          console.error('Unexpected API response format', response);
          return [];
        }
      })
    );
  }

  createPost(post: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.apiUrl, post);
  }

  updatePost(post: BlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/${post.id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
