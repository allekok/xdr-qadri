self.addEventListener('install', function(event) {
    event.waitUntil(
	caches.open('v3').then(function(cache) {
	    return cache.addAll([
		'./index.html',
		'./site/image/back.jpg',
		'./site/image/portraits/1.svg',
		'./site/image/portraits/1.jpg',
	    ]);
	})
    );
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['v3'];

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
	    return caches.match('./index.html');
	})
    );
});
