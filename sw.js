const expectedCaches = ['static-v23'];

self.addEventListener('install', event => {
  console.log('v23 installing…');

  event.waitUntil(
    caches
      .open('static-v23')
      .then(cache => cache.addAll(['https://neverthanmore.github.io/', '/style.css']))
  );
});

self.addEventListener('activate', event => {
  // 删除额外的缓存，static-v1 将被删掉
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys.map(key => {
            if (!expectedCaches.includes(key)) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => {
        console.log('v23 now ready to handle fetches!');
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request));
})

self.addEventListener('push', event => {
  self.registration.update && self.registration.update()
    .then(() => console.log('do update'))
});