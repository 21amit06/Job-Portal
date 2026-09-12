import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NavbarComponent } from './common/navbar/navbar.component';

import { SideNavbarComponent } from './common/side-navbar/side-navbar.component';
import { MainLayoutComponent } from './common/main-layout/main-layout.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    FlexLayoutModule,
    NavbarComponent,
    SideNavbarComponent,MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'root';
}
