class ServiceWorker {

  // This service worker has a
  // cache strategy: cache first
  // except for resources where you 
  // mark another strategy, these can be
  // network first or network only

  // When you change version below
  // you invalide the cache
  // (this happens immediately
  // not on next page load)

  // ironboy 2019

  constructor() {
    this.debug = false;
    this.version = 1.04;
    this.production = false;
    this.myRoute = 'serviceWorker.js';
    this.lastRequestTime = 0;
    this.log('running from scratch...');
    this.addEventListeners();
  }

  log(...args) {
    // add a slight delay to logs
    // otherwise the first one doesn't show (Chrome)
    this.debug && setTimeout(() => console.log.apply(
      console, ['ServiceWorker:', ...args]
    ), 500);
  }

  addEventListeners() {
    // Self is a reference to the service worker
    let add = (event, func) => self.addEventListener(event, func);
    // Important events are install, activate and fetch.
    // The event object they receive has methods (waitUntil, respondWith)
    // that you call with a promise/async function that needs to resolve 
    // before the event is considered "done" 
    add('install', e => e.waitUntil(this.install(e)));
    add('activate', e => e.waitUntil(this.activate(e)));
    add('fetch', e => {
      let method = e.request.method;
      let url = e.request.url.split('#')[0];
      // Let url:s with network only strategy
      // bypass the service worker completely
      if (this.networkOnly(method, url)) {
        this.log('network only strategy for', method, url);
        return false;
      }
      // Handle cache first and network first
      // strategies with the e.respondWith method
      else {
        return e.respondWith(this.fetch(e));
      }
    });
    if ("pushManager" in ServiceWorkerRegistration.prototype) {
      this.addPushEventListener();
    }
    this.log('added event listeners');
  }

  addPushEventListener() {
    self.addEventListener('push', e => {
      // console.log(e, 'hämid')
      const data = e.data.json();
      this.log('Push notification received');
      let title = data.title;
      delete data.title;
      e.waitUntil(self.registration.showNotification(title, data));
    });
  }

  async install() {
    // We call self.skipWaiting - which immediately
    // makes this version of the service worker call activate
    // (we could precache certain files here but we don't)
    await self.skipWaiting();
    this.log(`version ${this.version} installed.`);
  }

  async activate() {
    // We call self.clients.claim that sets this version of the 
    // service worker as the active "controller" for all all clients
    // where the site has been visited - removing old versions
    await self.clients.claim();
    this.log(`version ${this.version} activated.`);
  }

  async deleteOldCaches() {
    // Get the keys (corresponding to versions) of all caches
    // and delete all caches expect the one for this version
    for (let key of await caches.keys()) {
      if (key / 1 === this.version) { continue; }
      await caches.delete(key);
      this.log(`deleted old [cache ${key}]`);
    }
  }

  async fetch(e) {
    // Check version
    await this.getVersion();
    // Open or create the correct cache
    let cache = await caches.open(this.version);
    // Clear old caches
    await this.deleteOldCaches();
    // The request (url etc.) from the fetch event object:
    let req = e.request;
    // console.log("req", req)
    let url = req.url.split('#')[0];
    let method = req.method;
    let res;
    // Check for network first strategy
    let networkFirst = this.networkFirst(method, url);
    networkFirst && this.log('network first strategy for', method, url);
    if (!networkFirst) {
      // Look up the response in cache
      res = await cache.match(url);
      if (res) {
        // Serve from cache if we have it
        this.log(`served response from [cache ${this.version}]`, url);
        return res;
      }
    }
    // Otherwise fetch the response from our server
    let error;
    res = await fetch(req).catch(e => error = e);
    if (error) {
      this.log('could not get a response... offline?', url);
      if (networkFirst) {
        // is networkFirst, but network failed so now try the cache
        res = await cache.match(url);
        res && this.log('served stale from cache', url);
        if (res) { return res; }
      }
      this.log('served an response error', method, url);
      return Response.error(404);
    }
    // Open our current cache / or create it
    // put a copy of the response in the cache
    await cache.put(req, res.clone());
    this.log(`cached response in [cache ${this.version}]`, url);
    // Return the response
    this.log('served from server', url);
    return res;
  }

  // Advanced:
  // Since the constructor only runs on new installation + activation
  // and fetch runs before that a 'from cache first' cache strategy
  // usually lags behind current content with one page load
  // BUT: by checking the version from the fetch method (see above)
  // we can get around this and serve the current content directly
  // after a version change.
  async getVersion() {
    // Only check the version if at least 3 seconds since last request
    let requestTime = Date.now();
    if (requestTime - this.lastRequestTime < 3000) {
      return;
    }
    // Check the version by loading this file as text
    // and extracting the version number using a reg exp
    this.lastRequestTime = requestTime;
    let error, response = await fetch(this.myRoute)
      .catch(e => error = e);
    if (error) {
      // We couldn't load the file - probably offline
      this.log('could not get version, offline?', error);
      this.log('using latest known version', this.version);
      return;
    }
    // Set the version
    let text = await response.text();
    this.version = text.match(/this.version\s*=\s*([\d|\.]*)/)[1] / 1;
    this.log(`checked the site version: ${this.version}`);
    // Check if in production mode
    this.production = !!text.match(/this.production\s*=\s*true/);
    this.log('production mode', this.production);
    if (!this.production) {
      // turn off logging if not in production
      this.debug = false;
    }
  }

  networkFirst(method, url) {
    // Called for each fetch, your logic goes here, return true
    // if you want a network first strategy for the url

    // If not in production mode network first for everything
    if (!this.production) { return true; }

    // route: the url minus the origin/domain
    let route = url.replace(location.origin, '');

    // Network first for urls starting with /api/
    if (route.indexOf('/api/') === 0) { return true; }

  }

  networkOnly(method, url) {
    // Called for each fetch, your logic goes here, return true
    // if you want a network only strategy for the url

    // route: the url minus the origin/domain
    let route = url.replace(location.origin, '');

    // Network only if not method GET
    // although you could come up with a cache queue for POST,
    // PUT,DELETE and send them when the client is back online...
    // (right now our cache doesn't support this since we only
    // save urls as keys, not method + url as keys)
    if (method !== 'GET') { return true; }

    // Server Sent Evens should probably never be cached
    if (route.indexOf('/api/sse/') === 0) { return true; }
    if (route.indexOf('/api/') === 0) { return true; }

    // Let chrome extensions through
    if (url.indexOf('chrome-extension') === 0) { return true; }

    // Network only for urls not in our domain (cdn fonts, scripts)
    // (if not we will cache those too - which could be good)
    // if (url.indexOf(location.origin) !== 0) { return true; }
  }

}

new ServiceWorker();