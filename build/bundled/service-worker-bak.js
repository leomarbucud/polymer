var cacheName='1.0.1',cacheFiles=[`./elements/thegrid/grid-app.html`,`./elements/thegrid/grid-icons.html`,`./elements/thegrid/grid-styles.html`,`./elements/thegrid/components/carousel.html`,`./elements/thegrid/components/datepicker.html`,`./elements/thegrid/components/divider-text.html`,`./elements/thegrid/components/drawer.html`,`./elements/thegrid/components/grid-dropdown.html`,`./elements/thegrid/components/grid-introduction.html`,`./elements/thegrid/components/grid-map.html`,`./elements/thegrid/components/login-components.html`,`./elements/thegrid/components/mobile-header.html`,`./elements/thegrid/components/ratings.html`,`./elements/thegrid/components/social-button.html`,`./elements/thegrid/pages/grid-404.html`,`./elements/thegrid/pages/grid-filter.html`,`./elements/thegrid/pages/grid-forgot.html`,`./elements/thegrid/pages/grid-help-feedback.html`,`./elements/thegrid/pages/grid-help-inbox.html`,`./elements/thegrid/pages/grid-login.html`,`./elements/thegrid/pages/grid-posts.html`,`./elements/thegrid/pages/grid-profile.html`,`./elements/thegrid/pages/grid-register.html`,`./elements/thegrid/pages/grid-reset-password.html`,`./elements/thegrid/pages/grid-search.html`,`./elements/thegrid/pages/grid-settings.html`,`./elements/thegrid/pages/grid-user-post.html`,`./elements/thegrid/pages/grid-user-profile.html`,`./elements/thegrid/pages/bids/grid-bid.html`,`./elements/thegrid/pages/help/grid-feedback.html`,`./elements/thegrid/pages/help/grid-getting-started.html`,`./elements/thegrid/pages/help/grid-help-center.html`,`./elements/thegrid/pages/help/grid-new-feedback.html`,`./elements/thegrid/pages/inbox/grid-conversation.html`,`./elements/thegrid/pages/posts/grid-post.html`,`./elements/thegrid/pages/posts/grid-post-add-1.html`,`./elements/thegrid/pages/posts/grid-post-add-2.html`,`./elements/thegrid/pages/posts/grid-post-add-3.html`,`./elements/thegrid/pages/posts/grid-post-add-4.html`,`./elements/thegrid/pages/posts/grid-post-add.html`,`./elements/thegrid/pages/profile/grid-profile-about.html`,`./elements/thegrid/pages/profile/grid-profile-edit.html`,`./elements/thegrid/pages/profile/grid-profile-skills.html`,`./elements/thegrid/pages/register/grid-register-1.html`,`./elements/thegrid/pages/register/grid-register-2.html`,`./elements/thegrid/pages/register/grid-verify.html`,`./elements/thegrid/pages/settings/grid-settings-account-visibility.html`,`./elements/thegrid/pages/settings/grid-settings-account.html`,`./elements/thegrid/pages/settings/grid-settings-activity-log.html`,`./elements/thegrid/pages/settings/grid-settings-contact-information.html`,`./elements/thegrid/pages/settings/grid-settings-general.html`,`./elements/thegrid/pages/settings/grid-settings-locations.html`,`./elements/thegrid/pages/settings/grid-settings-mobile.html`,`./elements/thegrid/pages/settings/grid-settings-name.html`,`./elements/thegrid/pages/settings/grid-settings-password.html`,`./elements/thegrid/pages/settings/grid-settings-username.html`,`./elements/thegrid/pages/settings/grid-settings-verification.html`,`./elements/thegrid/pages/transactions/grid-transaction.html`,`./behaviors/map-behavior.html`,`./behaviors/form-slider-behavior.html`,`./behaviors/navigation-behavior.html`,`./redux/grid-redux-store.html`,`./node_modules/redux/dist/redux.js`,`./node_modules/axios/dist/axios.js`,`./assets/js/grid.js`,`./assets/js/markerclusterer.js`,`./assets/js/letter-avatar.js`,`./assets/images/grid-logo.svg`,'https://fonts.googleapis.com/css?family=Roboto'];self.addEventListener('install',function(a){console.log('[ServiceWorker] Installed'),a.waitUntil(caches.open(cacheName).then(function(a){return console.log('[ServiceWorker] Caching cacheFiles'),a.addAll(cacheFiles)}))}),self.addEventListener('activate',function(a){console.log('[ServiceWorker] Activated'),a.waitUntil(caches.keys().then(function(a){return Promise.all(a.map(function(a){if(a!==cacheName)return console.log('[ServiceWorker] Removing Cached Files from Cache - ',a),caches.delete(a)}))}))});const api_url='https://dev.thegrid.com'==location.origin?'api.thegrid.com':'dev-thegrid.azurewebsites.net';self.addEventListener('fetch',function(a){var b=new URL(a.request.url);if(b.hostname==api_url)return'GET'==a.request.method?-1==a.request.headers.get('Accept').indexOf('image')?'yes'==a.request.headers.get('Cached')?void a.respondWith(caches.match(a.request)):void a.respondWith(caches.open(cacheName).then(function(b){return fetch(a.request).then(function(c){return b.put(a.request,c.clone()),console.log('[ServiceWorker] API Data Cached',a.request.url),c})})):void a.respondWith(caches.match(a.request).then(function(b){return b||fetch(a.request)})):void 0;if(b.origin==location.origin)return void a.respondWith(caches.match(a.request).then((b)=>b?b:caches.open(cacheName).then((b)=>fetch(a.request).then((c)=>b.put(a.request,c.clone()).then(()=>c)))));if(/\.googleapis\.com$/.test(b.hostname)||/\.gstatic\.com$/.test(b.hostname)){return}a.respondWith(caches.match(a.request).then(function(b){return b||fetch(a.request)}))}),self.addEventListener('push',function(a){console.log('event push',a.data.text())});