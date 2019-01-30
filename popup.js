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

  document.getElementById("login-button").addEventListener("click", login);

  handleSendAuth = async (evt) => {
    evt.preventDefault();
    const email = $("#username").val();
    const password = $("#password").val();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      chrome.storage.sync.set({ login: "true" });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, "\n", errorMessage);
    }
  }
  
  handleSignUp = async (evt) => {
    evt.preventDefault();
    const email = $("#username").val();
    const password = $("#password").val();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      chrome.storage.sync.set({ login: "true" });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, "\n", errorMessage);
    }
  }

  firebase.auth().onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser) {
      const { uid } = firebase.auth().currentUser;
      await firebase
        .database()
        .ref(`/users/${uid}`)
        .on("value", (word) => {
          const words = word.val();
          chrome.storage.sync.set({ words: words, userid: uid });
        });
    }
  });

  $("#signup-button").click(() => {
    $("#login").html(`
      <div class="log-form">
        <h2>Sign Up for your account</h2>
        <div id='authform'>
          <input type="email" title="email" id="username" name="username" placeholder="email" />
          <input type="password" title="username" id="password" name="password" placeholder="password" />
          <button type="submit" id="gotAuth" class="btn">Submit</button>
        </div>
      </div>
    `);
    $("#gotAuth").click(event => {
      handleSignUp(event);
    });
  });

  $("#login-button").click(() => {
    $("#login").html(`
      <div class="log-form">
        <h2>Sign In to your account</h2>
        <div id='authform'>
          <input type="email" title="email" id="username" name="username" placeholder="email" />
          <input type="password" title="username" id="password" name="password" placeholder="password" />
          <button type="submit" id="gotAuth" class="btn">Submit</button>
        </div>
      </div>
    `);
    $("#gotAuth").click(event => {
      handleSendAuth(event);
    });
  });

  chrome.storage.sync.get(["total", "words"], (items) => {
    $("#total").text(items.total);
  });

  $("#addWord").click(() => {
    chrome.storage.sync.get(["total", "words"], (items) => {
      let newTotal = items.total + 1;
      newTotal = items.total + 1;

      chrome.storage.sync.set({ total: newTotal });
      $("#total").text(newTotal);

      const opt = {
        type: "basic",
        title: "Word Added",
        message: "Your word has been added",
        iconUrl: "icon.png"
      };

      chrome.notifications.create("wordAdded", opt, function() {});
    });
  });
});
