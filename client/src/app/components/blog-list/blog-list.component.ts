import { Component } from '@angular/core';
import { BlogPost } from '../interfaces/blog.model';
import { BlogService } from './blog.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {
  blogPosts: BlogPost[] = [];
  currentPost: BlogPost = { id: 0, title: '', content: '', author: '', created_at: new Date().toISOString() };
  isEditing = false;
  loading = true;
  error: string | null = null;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.blogService.getPosts().subscribe(
      posts => this.blogPosts = posts,
      error => console.error('Error loading posts', error)
    );
  }

  savePost() {
    if (this.currentPost.title.trim() && this.currentPost.content.trim()) {
      if (this.isEditing && this.currentPost.id !== null) {
        this.blogService.updatePost(this.currentPost).subscribe(
          () => {
            this.loadPosts();
            this.resetForm();
          },
          error => console.error('Error updating post', error)
        );
      } else {
        this.blogService.createPost(this.currentPost).subscribe(
          () => {
            this.loadPosts();
            this.resetForm();
          },
          error => console.error('Error creating post', error)
        );
      }
    } else {
      alert('Title and content are required!');
    }
  }

  editPost(post: BlogPost) {
    this.currentPost = { ...post };
    this.isEditing = true;
  }

  deletePost(post: BlogPost) {
    if (post.id !== null && confirm('Are you sure you want to delete this post?')) {
      this.blogService.deletePost(post.id).subscribe(
        () => this.loadPosts(),
        error => console.error('Error deleting post', error)
      );
    }
  }

  resetForm() {
    this.currentPost = { id: null, title: '', content: '',author:'',created_at:'' };
    this.isEditing = false;
  }
}
