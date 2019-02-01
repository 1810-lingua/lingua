const config = {
  apiKey: "AIzaSyBOGOfm3qgA0x8O_f-a3ButyIhyeFwb1V8",
  authDomain: "lingua-632b7.firebaseapp.com",
  databaseURL: "https://lingua-632b7.firebaseio.com",
  projectId: "lingua-632b7",
  storageBucket: "lingua-632b7.appspot.com",
  messagingSenderId: "349838454101"
};

firebase.initializeApp(config);

chrome.storage.sync.get(["userid"], async user => {
  if (user.userid){
  firebase
    .database()
    .ref(`/${user.userid}/spanish`)
    .on(`value`, snap => {
      chrome.storage.sync.set({"words" : Object.values(snap.val())})
    });
  }
});