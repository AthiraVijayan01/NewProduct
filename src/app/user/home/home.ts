import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Products {
  id: number;
  name: string;
  price: number;
  category: string;
  quantity?: number;
  image?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule]
})
export class Home implements OnInit {

  productslist: Products[] = [];
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const local = localStorage.getItem('products');
    if (local) {
      this.productslist = JSON.parse(local);
    } else {
      this.http.get<Products[]>('assets/datas.json').subscribe({
        next: data => {
          this.productslist = data;
          localStorage.setItem('products', JSON.stringify(data));
        },
        error: err => console.error(err)
      });
    }
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToView() {
    this.router.navigate(['/view']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}