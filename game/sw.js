if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);

            let installPromptEvent;

            window.addEventListener('beforeinstallprompt', (event) => {
                // Prevent Chrome <= 67 from automatically showing the prompt
                event.preventDefault();
                // Stash the event so it can be triggered later.
                installPromptEvent = event;
                // Update the install UI to notify the user app can be installed
                event.prompt()
            });
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
