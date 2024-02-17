import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RoutingRulesService implements RouteReuseStrategy {
  private storedRouteHandles = new Map<string, DetachedRouteHandle>();
  private chat_page_route:string = 'public-chat';

  // Called on every route change
  // Determine will we change route or not based on
  // current (curr) and newly selected route (future)
  // false = change route and do not reuse current
  // true = stick to this route, reuse it
  shouldReuseRoute(previousPath: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // leave default since we always want routing to work
    return previousPath.routeConfig === curr.routeConfig;
  }

  // return true if you want to store cache on exit
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // store only if we are
    if (this.onChatPage(route))
      return true;

    // by default do not store cache
    return false;
  }

  // return true if you want to use cache on load
  shouldAttach(route: ActivatedRouteSnapshot): boolean{
    // attach to cache if we are heading to chat page and cache exists
    if (this.onChatPage(route)  && this.storedRouteHandles.has(this.getPath(route)))
      return true;

      // by default do not go for cache
    return false;
  }

  // On page exit - Store cache policy
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    this.storedRouteHandles.set(this.getPath(route), detachedTree);

  }

  // On page load - Load from cache policy
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle{
    const path:string = this.getPath(route);
    if (this.onChatPage(route))
      return this.storedRouteHandles.get(path);
    return null;
  }

  // safe path extracting
  private getPath(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig !== null && route.routeConfig.path !== null) {
      return route.routeConfig.path;
    }
    return '';
  }

  // determine are we on the chat page
  private onChatPage(route:ActivatedRouteSnapshot): boolean {
    return this.chat_page_route === this.getPath(route)
  }

}
