// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false ,
  firebase: {
    apiKey: 'AIzaSyAU1z25kSaJDyaY9dRZvFgXjPjbNOdI5vI',
    authDomain: 'chatting-2a10d.firebaseapp.com',
    databaseURL: 'https://chatting-2a10d.firebaseio.com',
    projectId: 'chatting-2a10d',
    storageBucket: 'chatting-2a10d.appspot.com',
    messagingSenderId: '168426568244',
    appId: '1:168426568244:web:0f06c926db7f567e332861',
    measurementId: 'G-XFLP0NXEC0'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
/* 
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.15.3/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.15.3/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAU1z25kSaJDyaY9dRZvFgXjPjbNOdI5vI",
    authDomain: "chatting-2a10d.firebaseapp.com",
    databaseURL: "https://chatting-2a10d.firebaseio.com",
    projectId: "chatting-2a10d",
    storageBucket: "chatting-2a10d.appspot.com",
    messagingSenderId: "168426568244",
    appId: "1:168426568244:web:0f06c926db7f567e332861",
    measurementId: "G-XFLP0NXEC0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
*/