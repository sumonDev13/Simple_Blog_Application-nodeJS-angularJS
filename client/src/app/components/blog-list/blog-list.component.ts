import { Component } from '@angular/core';
import { BlogPost } from '../interfaces/blog.model';
import { BlogService } from './blog.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [BlogService],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {
  blogPosts: BlogPost[] = [];
  currentPost: BlogPost = { id: 0, title: '', content: '', author: '', created_at: new Date().toISOString() };
  isEditing = false;
  loading = true;
  error: string | null = null;
  isModalOpen = false;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.error = null;
    this.blogService.getPosts().pipe(
      tap(posts => {
        this.blogPosts = posts;
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(
      () => {},
      error => {
        console.error('Error loading posts', error);
        this.error = 'Failed to load posts. Please try again later.';
      }
    );
  }

  deletePost(post: BlogPost) {
    if (post.id !== null && confirm(`Are you sure you want to delete the post "${post.title}"?`)) {
      this.loading = true;
      this.blogService.deletePost(post.id).pipe(
        tap(() => {
          console.log('Post deleted successfully');
          this.blogPosts = this.blogPosts.filter(p => p.id !== post.id);
        }),
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(
        () => {},
        error => {
          console.error('Error deleting post', error);
          this.error = 'Failed to delete post. Please try again later.';
        }
      );
    }
  }

  editPost(post: BlogPost) {
    this.currentPost = { ...post };
    this.isEditing = true;
    this.openModal();
  }

  savePost() {
    if (this.currentPost.title.trim() && this.currentPost.content.trim()) {
      this.loading = true;
      const saveObservable = this.isEditing
        ? this.blogService.updatePost(this.currentPost)
        : this.blogService.createPost(this.currentPost);

      saveObservable.pipe(
        tap((savedPost: BlogPost) => {
          console.log('Post saved successfully');
          if (this.isEditing) {
            const index = this.blogPosts.findIndex(p => p.id === savedPost.id);
            if (index !== -1) {
              this.blogPosts[index] = savedPost;
            }
          } else {
            this.blogPosts.push(savedPost);
          }
          this.resetForm();
          this.closeModal();
        }),
        finalize(() => {
          this.loading = false;
          window.location.reload();
        })
      ).subscribe(
        () => {},
        error => {
          console.error('Error saving post', error);
          this.error = 'Failed to save post. Please try again later.';
        }
      );
    } else {
      alert('Title and content are required!');
    }
  }

  resetForm() {
    this.currentPost = { id: 0, title: '', content: '', author: '', created_at: new Date().toISOString() };
    this.isEditing = false;
    this.loading = false;
    this.error = null;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
