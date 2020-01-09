if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });

    let installPromptEvent;

    window.addEventListener('beforeinstallprompt', (event) => {
          deferredPrompt = event;
          showInstallPromotion();
    });
}

self.addEventListener('fetch', function(event) {

});

