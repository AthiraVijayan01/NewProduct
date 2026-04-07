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
  cartCount: number = 0;

  searchText: string = '';
  selectedBrand: string = '';
  selectedCategory: string = '';
  sortOption: string = '';

  brands: string[] = [];
  categories: string[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Products[]>('datas.json').subscribe(data => {
      this.productslist = data;
      this.filteredProducts = data;
      this.brands = [...new Set(data.map(p => p.brand))];
      this.categories = [...new Set(data.map(p => p.category))];
    });
    this.updateCartCount();
  }

  filterProducts() {
    let result = [...this.productslist];

    const text = this.searchText.toLowerCase();
    if (text) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(text) ||
        p.category.toLowerCase().includes(text) ||
        p.brand.toLowerCase().includes(text)
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
    } else if (this.sortOption === 'high') {
      result.sort((a, b) => b.price - a.price);
    }

    this.filteredProducts = result;
  }

  addToCart(product: Products) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = cart.findIndex((item: any) => item.id === product.id);

    if (index !== -1) {
      cart[index].quantity = (cart[index].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartCount();
    alert(product.name + ' added!');
  }

  updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartCount = cart.reduce((count: number, item: any) => {
      return count + (item.quantity || 1);
    }, 0);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goTohome() {
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