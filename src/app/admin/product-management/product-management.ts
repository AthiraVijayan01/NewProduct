import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  image: string;
}

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-management.html',
  styleUrls: ['./product-management.css']
})
export class ProductManagement implements OnInit {

  products: Product[] = [];

  name = '';
  price: number | null = null;
  category = '';
  brand = '';
  stock: number | null = null;
  image = '';

  showModal = false;
  isEdit = false;
  editId: number | null = null;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const data = localStorage.getItem('products');
    this.products = data ? JSON.parse(data) : [];
  }

  openModal(): void {
    this.showModal = true;
    this.isEdit = false;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.name = '';
    this.price = null;
    this.category = '';
    this.brand = '';
    this.stock = null;
    this.image = '';
    this.isEdit = false;
    this.editId = null;
  }

  editProduct(p: Product): void {
    this.showModal = true;
    this.isEdit = true;

    this.editId = p.id;
    this.name = p.name;
    this.price = p.price;
    this.category = p.category;
    this.brand = p.brand;
    this.stock = p.stock;
    this.image = p.image;
  }

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    const img = new Image();

    reader.onload = (e: any) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 300;
      const scale = MAX_WIDTH / img.width;

      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      this.image = canvas.toDataURL('image/jpeg', 0.7);
    };

    reader.readAsDataURL(file);
  }

  saveProduct(): void {
    if (!this.name || !this.price || !this.category || !this.brand || !this.stock) return;

    let products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');

    if (this.isEdit && this.editId !== null) {
      products = products.map(p =>
        p.id === this.editId
          ? {
              ...p,
              name: this.name,
              price: this.price!,
              category: this.category,
              brand: this.brand,
              stock: this.stock!,
              image: this.image
            }
          : p
      );
    } else {
      products.push({
        id: Date.now(),
        name: this.name,
        price: this.price!,
        category: this.category,
        brand: this.brand,
        stock: this.stock!,
        image: this.image
      });
    }

    localStorage.setItem('products', JSON.stringify(products));
    this.loadProducts();
    this.closeModal();
  }

  deleteProduct(id: number): void {
    let products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    products = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    this.loadProducts();
  }
}