$(function() {
  const config = {
    apiKey: "AIzaSyBOGOfm3qgA0x8O_f-a3ButyIhyeFwb1V8",
    authDomain: "lingua-632b7.firebaseapp.com",
    databaseURL: "https://lingua-632b7.firebaseio.com",
    projectId: "lingua-632b7",
    storageBucket: "lingua-632b7.appspot.com",
    messagingSenderId: "349838454101"
  };

  firebase.initializeApp(config);

  chrome.storage.sync.get(["login", "languageText"], items => {
    if (items.login === "true") {
      $("#popup-form").html(`<h2 class="ui header">Lingua
      
      <i class="language icon"></i>
      <div class="content">
        <div class="sub header">Right Click Lingua Icon > Go to Options to see your saved words</div>
      </div>
    </h2>
    <div>
    <h3>Select Language</h3>
    <div class="ui floating dropdown labeled search icon button">
      <i class="world icon"></i>
      <span class="text">${
        items.languageText ? items.languageText : "Spanish"
      }</span>
      <div class="menu">
      <div class="item">Spanish</div>
        <div class="item">French</div>
        <div class="item">German</div>
        <div class="item">Italian</div>
        <div class="item">Polish</div>
        <div class="item">Portuguese</div>
      </div>
      </div>
      <p>and refresh page for changes to be saved</p>
      
      <div id="login">
      <button class="ui button" id="logout-button" type="submit">Log Out</button>
    </div>
    </div>
    `);
      $("#logout-button").click(event => {
        handleLogOut(event);
      });
      $(".dropdown").dropdown({
        onChange: async function(value, text) {
          chrome.storage.sync.get(["userid"], user => {
            let userid = user.userid;
            firebase
              .database()
              .ref(`/${userid}/${value}`)
              .on(`value`, snap => {
                chrome.storage.sync.set({
                  words: Object.values(snap.val()),
                  languageText: text,
                  languageValue: value
                });
              });
            $("#dropdown").dropdown("set selected", value);
            $("#dropdown").dropdown("set text", text);
          });
        }
      });
    } else {
      $("#popup-form").html(`<form class="ui form log-form">
    <h1>Welcome to Lingua</h1>
    <div class="field">
      <input id="username" type="text" placeholder="Email" />
    </div>
    <div class="field">
      <input id="password" type="password" placeholder="Password" />
    </div>
    <div id="login">
      <button class="ui button" id="login-button" type="submit">Login</button>
      <button class="ui button" id="signup-button" type="submit">Sign Up</button>
    </div>
    </form>`);
    }
    $("#signup-button").click(event => {
      handleSignUp(event);
    });

    $("#login-button").click(event => {
      handleSendAuth(event);
    });
  });

  handleSendAuth = async evt => {
    evt.preventDefault();
    const email = $("#username").val();
    const password = $("#password").val();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      chrome.storage.sync.set({ login: "true" });
      window.close();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, "\n", errorMessage);
    }
  };

  handleSignUp = async evt => {
    evt.preventDefault();
    const email = $("#username").val();
    const password = $("#password").val();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      chrome.storage.sync.set({ login: "true" });
      window.close();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, "\n", errorMessage);
    }
  };

  handleLogOut = async evt => {
    evt.preventDefault();
    try {
      await firebase.auth().signOut();
      // signed out
      chrome.storage.sync.set({ login: "false" });
      window.close();
    } catch (e) {
      // an error
      alert("error: " + e);
    }
  };

  firebase.auth().onAuthStateChanged(async firebaseUser => {
    if (firebaseUser) {
      const { uid } = firebase.auth().currentUser;
      await firebase
        .database()
        .ref(`/users/${uid}`)
        .on("value", word => {
          const words = word.spanish.val();
          chrome.storage.sync.set({ words: words, userid: uid });
        });
    }
  });
});
