import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class Wishlist implements OnInit {

  wishlist: any[] = [];

  ngOnInit() {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  }

  removeItem(id: number) {
    this.wishlist = this.wishlist.filter(p => p.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  clearWishlist() {
    localStorage.removeItem('wishlist');
    this.wishlist = [];
  }
}