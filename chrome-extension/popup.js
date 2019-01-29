$(function() {
  var config = {
    apiKey: "AIzaSyBOGOfm3qgA0x8O_f-a3ButyIhyeFwb1V8",
    authDomain: "lingua-632b7.firebaseapp.com",
    databaseURL: "https://lingua-632b7.firebaseio.com",
    projectId: "lingua-632b7",
    storageBucket: "lingua-632b7.appspot.com",
    messagingSenderId: "349838454101"
  };
  firebase.initializeApp(config);
  // const db = firebase.database();

  document.getElementById("loginButton").addEventListener("click", login);

  async function handleSendAuth(evt) {
    evt.preventDefault();
    const email = $("#username").val();
    const password = $("#password").val();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      chrome.storage.sync.set({ login: "true" });
    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode, "\n", errorMessage);
    }
  }
  async function handleSignUp(evt) {
    evt.preventDefault();
    const email = $("#username").val();
    const password = $("#password").val();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      chrome.storage.sync.set({ login: "true" });
    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode, "\n", errorMessage);
    }
  }

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) console.log(firebaseUser);
  });

  $("#signup").click(() => {
    $("#login").html(`<div class="log-form">
    <h2>Sign Up for your account</h2>
    <div id='authform'>
      <input type="email" title="email" id="username" name="username" placeholder="email" />
      <input type="password" title="username" id="password" name="password" placeholder="password" />
      <button type="submit" id="gotAuth" class="btn">Submit</button>
    </div>
  </div>`);
    $("#gotAuth").click(event => {
      handleSignUp(event);
    });
  });

  function login() {
    document.getElementById("login").innerHTML = `<div class="log-form">
    <h2>Login to your account</h2>
    <div id='authform'>
      <input type="text" title="username" id="username" name="username" placeholder="username" />
      <input type="password" id="password" title="username" name="password" placeholder="password" />
      <button type="submit" id="gotAuth" class="btn">Login</button>
      <a class="forgot" href="#">Forgot Username?</a>
    </div>
  </div>`;
    document
      .getElementById("gotAuth")
      .addEventListener("click", event => handleSendAuth(event));
  }

  chrome.storage.sync.get(["total", "words"], function(items) {
    $("#total").text(items.total);
  });
  $("#addWord").click(function() {
    chrome.storage.sync.get(["total", "words"], async function(items) {
      let newTotal = items.total + 1;

      newTotal = items.total + 1;

      chrome.storage.sync.set({ total: newTotal });
      $("#total").text(newTotal);

      let opt = {
        type: "basic",
        title: "Word Added",
        message: "Your word has been added",
        iconUrl: "icon.png"
      };
      chrome.notifications.create("wordAdded", opt, function() {});
    });
  });
});
