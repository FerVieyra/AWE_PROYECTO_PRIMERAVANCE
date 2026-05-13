import { Component, Input, inject, computed , signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  userServ = inject(UserService);
  authServ = inject(AuthService);
  user = computed(() => this.userServ.user()?.nombre);
  isLoggedIn = signal(this.authServ.isLoggedIn());

  @Input() typeHeader: string = 'short';

  constructor(){
    if(this.authServ.isLoggedIn())
        this.userServ.getUser();
  }

  onLogOut()
  {
    console.log("HEllo?");
    this.authServ.logout();
  }
}
