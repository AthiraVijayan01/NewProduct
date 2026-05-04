import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Products {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  brand: string;
  stock: number;
  quantity?: number;
}

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './view.html',
  styleUrls: ['./view.css']
})
export class View implements OnInit {

  productslist: Products[] = [];
  filteredProducts: Products[] = [];

  searchText = '';
  selectedBrand = '';
  selectedCategory = '';
  sortOption = '';

  brands: string[] = [];
  categories: string[] = [];

  cartCount = 0;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
    this.updateCartCount();
  }

  loadProducts() {
    const data = localStorage.getItem('products');

    if (data) {
      this.productslist = JSON.parse(data);
      this.filteredProducts = [...this.productslist];
      this.loadFilters();
    } else {
      this.http.get<Products[]>('assets/datas.json').subscribe(res => {
        this.productslist = res;
        this.filteredProducts = [...res];
        localStorage.setItem('products', JSON.stringify(res));
        this.loadFilters();
      });
    }
  }

  loadFilters() {
    this.brands = [...new Set(this.productslist.map(p => p.brand))];
    this.categories = [...new Set(this.productslist.map(p => p.category))];
  }

  filterProducts() {
    let result = [...this.productslist];

    const text = this.searchText.toLowerCase();

    if (text) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(text) ||
        p.brand.toLowerCase().includes(text) ||
        p.category.toLowerCase().includes(text)
      );
    }

    if (this.selectedBrand) {
      result = result.filter(p => p.brand === this.selectedBrand);
    }

    if (this.selectedCategory) {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    if (this.sortOption === 'low') {
      result.sort((a, b) => a.price - b.price);
    }

    if (this.sortOption === 'high') {
      result.sort((a, b) => b.price - a.price);
    }

    this.filteredProducts = result;
  }

  addToCart(product: Products) {

    if (product.stock === 0) return;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const index = cart.findIndex((p: any) => p.id === product.id);

    if (index !== -1) {
      if (cart[index].quantity < product.stock) {
        cart[index].quantity += 1;
      }
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartCount();
  }

  toggleWishlist(product: Products) {

    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    const index = wishlist.findIndex((p: any) => p.id === product.id);

    if (index === -1) {
      wishlist.push(product);
    } else {
      wishlist.splice(index, 1);
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    this.filteredProducts = [...this.filteredProducts];
  }

  isInWishlist(product: Products) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return wishlist.some((p: any) => p.id === product.id);
  }

  updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartCount = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  resetFilters() {
    this.searchText = '';
    this.selectedBrand = '';
    this.selectedCategory = '';
    this.sortOption = '';
    this.filteredProducts = [...this.productslist];
  }
}