import { Component } from '@angular/core';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, SideNavbarComponent, FlexLayoutModule,RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
