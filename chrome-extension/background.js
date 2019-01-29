// TODO(DEVELOPER): Change the values below using values from the initialization snippet: Firebase Console > Overview > Add Firebase to your web app.
// Initialize Firebase
const config = {
  apiKey: "AIzaSyBOGOfm3qgA0x8O_f-a3ButyIhyeFwb1V8",
  authDomain: "lingua-632b7.firebaseapp.com",
  databaseURL: "https://lingua-632b7.firebaseio.com",
  projectId: "lingua-632b7",
  storageBucket: "lingua-632b7.appspot.com",
  messagingSenderId: "349838454101"
};

const app = firebase.initializeApp(config);
const auth = app.auth();
const db = app.database();

/**
 * initApp handles setting up the Firebase context and registering
 * callbacks for the auth status.
 *
 * The core initialization is in firebase.App - this is the glue class
 * which stores configuration. We provide an app name here to allow
 * distinguishing multiple app instances.
 *
 * This method also registers a listener with firebase.auth().onAuthStateChanged.
 * This listener is called when the user is signed in or out, and that
 * is where we update the UI.
 *
 * When signed in, we also authenticate to the Firebase Realtime Database.
 */
function initApp() {
  // Listen for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    console.log(
      "User state change detected from the Background script of the Chrome Extension:",
      user
    );
    if (user.email) {
      //send something the popup html document object
    }
  });
}

window.onload = function() {
  initApp();
};
