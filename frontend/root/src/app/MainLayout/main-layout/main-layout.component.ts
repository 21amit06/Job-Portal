import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { SideNavbarComponent } from '../../common/side-navbar/side-navbar.component';
import { NavbarComponent } from '../../common/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, SideNavbarComponent, FlexLayoutModule,RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
