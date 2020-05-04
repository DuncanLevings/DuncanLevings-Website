// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))***REMOVED***3***REMOVED***$/
    )
);

export function register(config) ***REMOVED***
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) ***REMOVED***
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) ***REMOVED***
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    ***REMOVED***

    window.addEventListener('load', () => ***REMOVED***
      const swUrl = `$***REMOVED***process.env.PUBLIC_URL***REMOVED***/service-worker.js`;

      if (isLocalhost) ***REMOVED***
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => ***REMOVED***
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        ***REMOVED***);
      ***REMOVED*** else ***REMOVED***
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***
***REMOVED***

function registerValidSW(swUrl, config) ***REMOVED***
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => ***REMOVED***
      registration.onupdatefound = () => ***REMOVED***
        const installingWorker = registration.installing;
        if (installingWorker == null) ***REMOVED***
          return;
        ***REMOVED***
        installingWorker.onstatechange = () => ***REMOVED***
          if (installingWorker.state === 'installed') ***REMOVED***
            if (navigator.serviceWorker.controller) ***REMOVED***
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) ***REMOVED***
                config.onUpdate(registration);
              ***REMOVED***
            ***REMOVED*** else ***REMOVED***
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) ***REMOVED***
                config.onSuccess(registration);
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***;
      ***REMOVED***;
    ***REMOVED***)
    .catch(error => ***REMOVED***
      console.error('Error during service worker registration:', error);
    ***REMOVED***);
***REMOVED***

function checkValidServiceWorker(swUrl, config) ***REMOVED***
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, ***REMOVED***
    headers: ***REMOVED*** 'Service-Worker': 'script' ***REMOVED***,
  ***REMOVED***)
    .then(response => ***REMOVED***
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) ***REMOVED***
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => ***REMOVED***
          registration.unregister().then(() => ***REMOVED***
            window.location.reload();
          ***REMOVED***);
        ***REMOVED***);
      ***REMOVED*** else ***REMOVED***
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      ***REMOVED***
    ***REMOVED***)
    .catch(() => ***REMOVED***
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    ***REMOVED***);
***REMOVED***

export function unregister() ***REMOVED***
  if ('serviceWorker' in navigator) ***REMOVED***
    navigator.serviceWorker.ready
      .then(registration => ***REMOVED***
        registration.unregister();
      ***REMOVED***)
      .catch(error => ***REMOVED***
        console.error(error.message);
      ***REMOVED***);
  ***REMOVED***
***REMOVED***
