if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
    );
});

let installPromptEvent;

window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome <= 67 from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    installPromptEvent = event
    console.log("beforeinstallprompt - Event")
    console.log(event)
    // Update the install UI to notify the user app can be installed
    event.prompt()
});