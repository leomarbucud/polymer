/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/* eslint no-console: ["error", { allow: ["info"] }] */

// console.info(
//   'Service worker disabled for development, will be generated at build time.'
// );

// Set a name for the current cache
var cacheName = 'v1.1.1';

// Default files to always cache
var cacheFiles = [
	'./',
	'./index.html',
	"./elements/thegrid/grid-app.html",
	"./elements/thegrid/grid-icons.html",
	"./elements/thegrid/grid-styles.html",
	"./elements/thegrid/components/carousel.html",
	"./elements/thegrid/components/datepicker.html",
	"./elements/thegrid/components/divider-text.html",
	"./elements/thegrid/components/drawer.html",
	"./elements/thegrid/components/grid-dropdown.html",
	"./elements/thegrid/components/grid-introduction.html",
	"./elements/thegrid/components/grid-map.html",
	"./elements/thegrid/components/login-components.html",
	"./elements/thegrid/components/mobile-header.html",
	"./elements/thegrid/components/ratings.html",
	"./elements/thegrid/components/social-button.html",
	"./elements/thegrid/pages/grid-404.html",
	"./elements/thegrid/pages/grid-filter.html",
	"./elements/thegrid/pages/grid-forgot.html",
	"./elements/thegrid/pages/grid-help-feedback.html",
	"./elements/thegrid/pages/grid-help-inbox.html",
	"./elements/thegrid/pages/grid-login.html",
	"./elements/thegrid/pages/grid-posts.html",
	"./elements/thegrid/pages/grid-profile.html",
	"./elements/thegrid/pages/grid-register.html",
	"./elements/thegrid/pages/grid-reset-password.html",
	"./elements/thegrid/pages/grid-search.html",
	"./elements/thegrid/pages/grid-settings.html",
	"./elements/thegrid/pages/grid-user-post.html",
	"./elements/thegrid/pages/grid-user-profile.html",
	"./elements/thegrid/pages/bids/grid-bid.html",
	"./elements/thegrid/pages/help/grid-feedback.html",
	"./elements/thegrid/pages/help/grid-getting-started.html",
	"./elements/thegrid/pages/help/grid-help-center.html",
	"./elements/thegrid/pages/help/grid-new-feedback.html",
	"./elements/thegrid/pages/inbox/grid-conversation.html",
	"./elements/thegrid/pages/posts/grid-post.html",
	"./elements/thegrid/pages/posts/grid-post-add-1.html",
	"./elements/thegrid/pages/posts/grid-post-add-2.html",
	"./elements/thegrid/pages/posts/grid-post-add-3.html",
	"./elements/thegrid/pages/posts/grid-post-add-4.html",
	"./elements/thegrid/pages/posts/grid-post-add.html",
	"./elements/thegrid/pages/profile/grid-profile-about.html",
	"./elements/thegrid/pages/profile/grid-profile-edit.html",
	"./elements/thegrid/pages/profile/grid-profile-skills.html",
	"./elements/thegrid/pages/register/grid-register-1.html",
	"./elements/thegrid/pages/register/grid-register-2.html",
	"./elements/thegrid/pages/register/grid-verify.html",
	"./elements/thegrid/pages/settings/grid-settings-account-visibility.html",
	"./elements/thegrid/pages/settings/grid-settings-account.html",
	"./elements/thegrid/pages/settings/grid-settings-activity-log.html",
	"./elements/thegrid/pages/settings/grid-settings-contact-information.html",
	"./elements/thegrid/pages/settings/grid-settings-general.html",
	"./elements/thegrid/pages/settings/grid-settings-locations.html",
	"./elements/thegrid/pages/settings/grid-settings-mobile.html",
	"./elements/thegrid/pages/settings/grid-settings-name.html",
	"./elements/thegrid/pages/settings/grid-settings-password.html",
	"./elements/thegrid/pages/settings/grid-settings-username.html",
	"./elements/thegrid/pages/settings/grid-settings-verification.html",
	"./elements/thegrid/pages/transactions/grid-transaction.html",
	"./behaviors/map-behavior.html",
	"./behaviors/form-slider-behavior.html",
	"./behaviors/navigation-behavior.html",
	// "./redux/grid-redux-store.html",
	"./node_modules/redux/dist/redux.js",
	"./node_modules/axios/dist/axios.js",
	"./assets/js/grid.js",
	"./assets/js/markerclusterer.js",
	"./assets/js/letter-avatar.js",
	'https://fonts.googleapis.com/css?family=Roboto'
]


self.addEventListener('install', function (e) {
	console.log('[ServiceWorker] Installed');

	// e.waitUntil Delays the event until the Promise is resolved
	e.waitUntil(

		// Open the cache
		caches.open(cacheName).then(function (cache) {

			// Add all the default files to the cache
			console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(cacheFiles);
		})
	); // end e.waitUntil
});


self.addEventListener('activate', function (e) {
	console.log('[ServiceWorker] Activated');

	e.waitUntil(

		// Get all the cache keys (cacheName)
		caches.keys().then(function (cacheNames) {
			return Promise.all(cacheNames.map(function (thisCacheName) {

				// If a cached item is saved under a previous cacheName
				if (thisCacheName !== cacheName) {

					// Delete that cached file
					console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	); // end e.waitUntil

});


self.addEventListener('fetch', function (e) {
	// console.log('[ServiceWorker] Fetch', e.request.url);

	var requestURL = new URL(e.request.url);

	// Handle requests to a particular host specifically
	if (requestURL.hostname == 'api.thegrid.com') {
		if (e.request.method == 'GET') {

			if (e.request.headers.get('Cached') == 'yes') {

				e.respondWith(
					caches.match(e.request)
				);

				return;
			}

			e.respondWith(
				caches.open(cacheName).then(function(cache) {
					return fetch(e.request).then(function(response) {
						cache.put(e.request, response.clone());
						console.log('[ServiceWorker] API Data Cached', e.request.url);
						return response;
					});
				})
				// caches.open(cacheName).then(function(cache) {
				// 	return cache.match(e.request).then(function (response) {
						
				// 		fetch(e.request).then(function(response) {
				// 			cache.put(e.request, response.clone());
				// 			return response;
				// 		});
						
				// 		return response || fetch(e.request).then(function(response) {
				// 			cache.put(e.request, response.clone());
				// 			return response;
				// 		});
				// 	});
				// })
				// caches.match(e.request).then(cachedResponse => {
				// 	if (cachedResponse) {
				// 		return cachedResponse;
				// 	}
	
				// 	return caches.open(cacheName).then(cache => {
				// 		return fetch(e.request).then(response => {
				// 			// Put a copy of the response in the runtime cache.
				// 			return cache.put(e.request, response.clone()).then(() => {
				// 				return response;
				// 			});
				// 		});
				// 	});
				// })
				// caches.open(cacheName).then(function(cache) {
				// 	return fetch(e.request).then(function(response) {
				// 		cache.put(e.request, response.clone());
				// 		console.log('[ServiceWorker] API Data Cached', e.request.url);
				// 		return response;
				// 	});
				// })
			);
			return;
		}
		return;
	}
	// Routing for local URLs
	if (requestURL.origin == location.origin) {

		e.respondWith(
			caches.match(e.request).then(cachedResponse => {
				if (cachedResponse) {
					return cachedResponse;
				}

				return caches.open(cacheName).then(cache => {
					return fetch(e.request).then(response => {
						// Put a copy of the response in the runtime cache.
						return cache.put(e.request, response.clone()).then(() => {
							return response;
						});
					});
				});
			})
		);
		return;
	}

	if (/\.googleapis\.com$/.test(requestURL.hostname) ||
			/\.gstatic\.com$/.test(requestURL.hostname)) {
		e.respondWith(
			caches.match(e.request).then(cachedResponse => {
				if (cachedResponse) {
					// console.log('[ServiceWorker] GOOGLE API', e.request.url);
					return cachedResponse;
				}

				return caches.open(cacheName).then(cache => {
					return fetch(e.request).then(response => {
						// Put a copy of the response in the runtime cache.
						// console.log('[ServiceWorker] GOOGLE API', e.request.url);
						return cache.put(e.request, response.clone()).then(() => {
							return response;
						});
					});
				});
			})
		);
		return;
	}

	// A sensible default pattern
	e.respondWith(
		caches.match(e.request).then(function (response) {
			return response || fetch(e.request);
		})
	);
	// var requestURL = new URL(e.request.url);
	/*
		if(requestURL.hostname != 'api.thegrid.com') {
			// console.log('Request is to grid api');
		} else if(/\.googleapis\.com$/.test(requestURL.hostname) ||
							/\.gstatic\.com$/.test(requestURL.hostname)) {
			// console.log('Request is to google api');
		} else {
			console.log('[ServiceWorker] Fetch', e.request.url);
	
			// e.respondWidth Responds to the fetch event
			e.respondWith(
	
				// Check in cache for the request being made
				caches.match(e.request)
	
	
					.then(function(response) {
	
						// If the request is in the cache
						if ( response ) {
							console.log("[ServiceWorker] Found in Cache", e.request.url, response);
							// Return the cached version
							return response;
						}
	
						// If the request is NOT in the cache, fetch and cache
	
						var requestClone = e.request.clone();
						fetch(requestClone)
							.then(function(response) {
	
								if ( !response ) {
									console.log("[ServiceWorker] No response from fetch ")
									return response;
								}
	
								var responseClone = response.clone();
	
								//  Open the cache
								return caches.open(cacheName).then(function(cache) {
	
									// Put the fetched response in the cache
									cache.put(e.request, responseClone);
									// console.log('aaaaaaaaa', e.request, responseClone);
									console.log('[ServiceWorker] New Data Cached', e.request.url);
	
									console.log('response', response);
									// Return the response
									return response;
	
								}); // end caches.open
	
							})
							.catch(function(err) {
								console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
							});
	
	
					}) // end caches.match(e.request)
			); // end e.respondWith
	
		}
	*/
});

self.addEventListener('push', function(e) {
	console.log('event push', e.data.text());
  // if (event.data.text() == 'new-email') {
  //   event.waitUntil(
  //     caches.open('mysite-dynamic').then(function(cache) {
  //       return fetch('/inbox.json').then(function(response) {
  //         cache.put('/inbox.json', response.clone());
  //         return response.json();
  //       });
  //     }).then(function(emails) {
  //       registration.showNotification("New email", {
  //         body: "From " + emails[0].from.name
  //         tag: "new-email"
  //       });
  //     })
  //   );
  // }
});