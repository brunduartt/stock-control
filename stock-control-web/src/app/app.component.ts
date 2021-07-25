import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private titleService: Title, private router:Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(this.router);
        let routeSnapshot = this.router.routerState.snapshot.root;
        let title = this.getTitle(routeSnapshot);
        if(!title) {
          title = 'SGE';
        }
        this.titleService.setTitle(title);
      }
    })
  }


  getTitle(routeSnapshot: ActivatedRouteSnapshot):string {
    let title;
    if(routeSnapshot.data && routeSnapshot.data.pageTitle) {
      title = routeSnapshot.data.pageTitle;    
    }
    if(routeSnapshot.firstChild) {
      title = this.getTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }
}
