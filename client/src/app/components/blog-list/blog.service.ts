import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BlogPost } from '../interfaces/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<BlogPost[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        // Check if the response is an object with a 'posts' property
        if (response && typeof response === 'object' && response.posts) {
          return response.posts as BlogPost[];
        }
        // If it's already an array, return it directly
        if (Array.isArray(response)) {
          return response as BlogPost[];
        }
        // If we can't find an array of posts, return an empty array
        console.error('Unexpected API response format', response);
        return [] as BlogPost[];
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
