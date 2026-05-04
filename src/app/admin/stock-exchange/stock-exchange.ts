import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  brand: string;
  stock: number;
}

@Component({
  selector: 'app-stock-exchange',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-exchange.html',
  styleUrls: ['./stock-exchange.css']
})
export class StockExchange implements OnInit {

  products: Product[] = [];
  editStockMap: { [key: number]: number } = {};

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = JSON.parse(localStorage.getItem('products') || '[]');
  }

  updateStock(p: Product) {
    const newStock = this.editStockMap[p.id];

    if (newStock === undefined || newStock < 0) return;

    this.products = this.products.map(prod =>
      prod.id === p.id ? { ...prod, stock: newStock } : prod
    );

    localStorage.setItem('products', JSON.stringify(this.products));
    this.loadProducts();
  }

  getStockStatus(stock: number): string {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 5) return 'Low Stock';
    return 'In Stock';
  }
}