const version = "v6";
self.addEventListener('install', function(event) {
    event.waitUntil(
	caches.open(version).then(function(cache) {
	    return cache.addAll([
		'/xile-derzi/sw.js',
		'/xile-derzi/index.html',
		'/xile-derzi/site/script.js?v2',
		'/xile-derzi/site/style.css?v1',
		'/xile-derzi/site/image/back.jpg',
		'/xile-derzi/site/image/portraits/1.svg',
		'/xile-derzi/site/image/portraits/1.jpg',
		'/xile-derzi/site/DroidNaskh-Regular.woff2',
	    ]);
	})
    );
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = [version];

    event.waitUntil(
	caches.keys().then(function(keyList) {
	    return Promise.all(keyList.map(function(key) {
		if (cacheWhitelist.indexOf(key) === -1) {
		    return caches.delete(key);
		}
	    }));
	})
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
	caches.match(event.request).then(function(resp) {
	    return resp || fetch(event.request).then(function(response) {		
		return response;
	    });
	}).catch(function() {
	    return caches.match('/xile-derzi/index.html');
	})
    );
});
