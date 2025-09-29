// Service Worker for Frontend Tools Hub
// Provides basic caching for improved performance and offline functionality

const CACHE_NAME = "frontend-tools-hub-v2.0.0";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/logo.png",
  "/manifest.json",
];

const EXTERNAL_ASSETS = [
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Cache external assets separately (they might fail)
        return caches.open(CACHE_NAME);
      })
      .then((cache) => {
        console.log("Service Worker: Caching external assets");
        return Promise.allSettled(
          EXTERNAL_ASSETS.map((url) =>
            cache
              .add(url)
              .catch((err) => console.warn(`Failed to cache ${url}:`, err))
          )
        );
      })
      .then(() => {
        console.log("Service Worker: Installation complete");
        return self.skipWaiting(); // Activate immediately
      })
      .catch((error) => {
        console.error("Service Worker: Installation failed:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              console.log("Service Worker: Deleting old cache:", cache);
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => {
        console.log("Service Worker: Activation complete");
        return self.clients.claim(); // Take control immediately
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Skip chrome-extension and other protocols
  if (!event.request.url.startsWith("http")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached version if available
      if (cachedResponse) {
        console.log("Service Worker: Serving from cache:", event.request.url);
        return cachedResponse;
      }

      // Otherwise fetch from network
      console.log("Service Worker: Fetching from network:", event.request.url);
      return fetch(event.request)
        .then((response) => {
          // Don't cache if not a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Cache successful responses for future use
          const responseToCache = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            })
            .catch((error) => {
              console.warn("Service Worker: Failed to cache response:", error);
            });

          return response;
        })
        .catch((error) => {
          console.warn("Service Worker: Network fetch failed:", error);

          // Return offline fallback for HTML requests
          if (event.request.destination === "document") {
            return caches.match("/index.html");
          }

          // For other requests, just fail
          throw error;
        });
    })
  );
});

// Handle background sync (if needed in future)
self.addEventListener("sync", (event) => {
  console.log("Service Worker: Background sync triggered:", event.tag);

  if (event.tag === "background-sync") {
    event.waitUntil(
      // Perform background sync tasks here
      console.log("Service Worker: Performing background sync")
    );
  }
});

// Handle push notifications (if needed in future)
self.addEventListener("push", (event) => {
  console.log("Service Worker: Push notification received");

  const options = {
    body: event.data ? event.data.text() : "New update available!",
    icon: "/logo.png",
    badge: "/logo.png",
    data: {
      url: "/",
    },
  };

  event.waitUntil(
    self.registration.showNotification("Frontend Tools Hub", options)
  );
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Notification clicked");

  event.notification.close();

  event.waitUntil(clients.openWindow(event.notification.data.url || "/"));
});

// Error handling
self.addEventListener("error", (event) => {
  console.error("Service Worker: Error occurred:", event.error);
});

self.addEventListener("unhandledrejection", (event) => {
  console.error("Service Worker: Unhandled promise rejection:", event.reason);
});

console.log("Service Worker: Script loaded successfully");
