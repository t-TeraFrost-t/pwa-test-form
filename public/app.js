const publicVapidKey = "BMjUHqFeaPgMLifC--c6WtThZU0fRnkVW7KH2EKbJZSmra7xStK5J6coJMSPf_xftjChcl81Yue_29gItgfdXoM";
if('serviceWorker' in navigator){
  
  
  const subscription =  send().catch(err => console.error(err));
  setTimeout(()=>{
    console.log("Sending Push...");
    await fetch("/notify", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "content-type": "application/json"
      }
    });
    console.log("Push Sent...");
  },100).catch(err => console.error(err)); 
}

async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/sw.js", {
    scope: "/"
  });
  console.log("Service Worker Registered...");

  // Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push Registered...");
  return subscription;

  // Send Push Notification
 
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}