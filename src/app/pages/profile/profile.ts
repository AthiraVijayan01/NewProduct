import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  user: any = {
    name: '',
    address: '',
    district: '',
    place: '',
    image: '',
    gender: '',
    phone: ''
  };

  isSidebarOpen = false;

  districts: string[] = [
    'Thiruvananthapuram','Kollam','Pathanamthitta','Alappuzha','Kottayam',
    'Idukki','Ernakulam','Thrissur','Palakkad','Malappuram',
    'Kozhikode','Wayanad','Kannur','Kasaragod'
  ];

  placesMap: any = {
    'Thiruvananthapuram': ['Neyyattinkara', 'Varkala', 'Kazhakoottam'],
    'Kollam': ['Karunagappally', 'Punalur'],
    'Pathanamthitta': ['Adoor', 'Thiruvalla', 'Pandalam'],
    'Alappuzha': ['Alappuzha Town', 'Cherthala', 'Kayamkulam'],
    'Kottayam': ['Kottayam', 'Pala', 'Changanassery','Pampady'],
    'Idukki': ['Thodupuzha', 'Munnar', 'Kattappana'],
    'Ernakulam': ['Kochi', 'Aluva', 'Edappally', 'Angamaly','Kothamangalam'],
    'Thrissur': ['Thrissur', 'Guruvayur', 'Chalakudy'],
    'Palakkad': ['Kollamkod', 'Ottapalam', 'Chittur'],
    'Malappuram': ['Manjeri', 'Perinthalmanna', 'Tirur'],
    'Kozhikode': ['Calicut', 'Koyilandy', 'Vadakara'],
    'Wayanad': ['Kalpetta', 'Sulthan Bathery', 'Mananthavady'],
    'Kannur': ['Kannur', 'Taliparamba', 'Payyannur'],
    'Kasaragod': ['Kasaragod', 'Kanhangad', 'Uppala']
  };

  selectedPlaces: string[] = [];

  isLanguageModalOpen = false;
  selectedLanguage = 'English';
  languages: string[] = ['English', 'Malayalam', 'Hindi'];

  isTermsModalOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('user');
    if (data) {
      this.user = JSON.parse(data);
      if (this.user.district) {
        this.selectedPlaces = this.placesMap[this.user.district] || [];
      }
    }

    const lang = localStorage.getItem('language');
    if (lang) this.selectedLanguage = lang;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  onDistrictChange() {
    this.selectedPlaces = this.placesMap[this.user.district] || [];
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => this.user.image = reader.result as string;
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  updateProfile() {
    localStorage.setItem('user', JSON.stringify(this.user));
    alert('Profile updated successfully!');
  }

  goToCart() {
    this.router.navigate(['/cart']);
    this.closeSidebar();
  }

  goToView() {
    this.router.navigate(['/view']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  openLanguageModal() {
    this.isLanguageModalOpen = true;
    this.closeSidebar();
  }

  closeLanguageModal() {
    this.isLanguageModalOpen = false;
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    localStorage.setItem('language', lang);
    this.closeLanguageModal();
  }

  openTermsModal() {
    this.isTermsModalOpen = true;
    this.closeSidebar();
  }

  closeTermsModal() {
    this.isTermsModalOpen = false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}