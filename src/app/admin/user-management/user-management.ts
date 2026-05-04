import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  place: string;
  district: string;
  role: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.css']
})
export class UserManagement implements OnInit {

  users: User[] = [];

  showModal = false;
  isEdit = false;

  user: User = {
    id: 0,
    username: '',
    name: '',
    email: '',
    phone: '',
    place: '',
    district: '',
    role: ''
  };

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
  }

  openAddModal(): void {
    this.reset();
    this.isEdit = false;
    this.showModal = true;
  }
  closeModal(): void {
    this.showModal = false;
  }
  saveUser(): void {
    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (this.isEdit) {
      users = users.map(u =>
        u.id === this.user.id ? this.user : u
      );
    } else {
      users.push({
        ...this.user,
        id: Date.now()
      });
    }

    localStorage.setItem('users', JSON.stringify(users));
    this.loadUsers();
    this.closeModal();
    this.reset();
  }

  editUser(u: User): void {
    this.user = { ...u };
    this.isEdit = true;
    this.showModal = true;
  }

  deleteUser(id: number): void {
    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(users));
    this.loadUsers();
  }

  reset(): void {
    this.user = {
      id: 0,
      username: '',
      name: '',
      email: '',
      phone: '',
      place: '',
      district: '',
      role: ''
    };
  }
}