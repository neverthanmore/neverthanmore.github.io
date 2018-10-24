const expectedCaches = ['static-v17'];

self.addEventListener('install', event => {
  console.log('v17 installing…');

  // 将 horse.svg 缓存在新的缓存 static-v2 中
  // console.log(this.registration)
  // event.waitUntil(
  //   caches
  //     .open('static-v17')
  //     .then(cache => cache.addAll(['https://localhost/', '/images/3.png', '/stylesheets/style.css']))
  // );

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
        console.log('v17 now ready to handle fetches!');
      })
  );
});

self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received.');
  let title = 'Server Push';
  let options = {
    body: 'push TEST',
    icon: './images/jekyll-logo.png'
  };
  if (event.data) {
    options = event.data.json();
    title = options.title;
  }
  event.waitUntil(self.registration.showNotification(title, options));
});