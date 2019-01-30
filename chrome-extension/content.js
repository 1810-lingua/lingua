const dictionary = {};

function replaceText() {
  console.log("replaceText ran");
  chrome.storage.sync.get(["userid", "words"], function(items) {
    if (items.userid) {
      dictionary = items.words;
      let words = Object.keys(dictionary).filter(key =>
        dictionary.hasOwnProperty(key)
      );
      const ps = [...document.getElementsByTagName("p")];
      ps.forEach(child => {
        if (child.innerText) {
          let text = child.innerText;
          words.forEach(word => {
            if (text.includes(word)) {
              const re = new RegExp(word, "g");
              text = text.replace(re, dictionary[word]);
            }
          });
          child.innerText = text;
        }
      });
    }
  });
}
function gotMessage(message, sender, sendResponse) {
  console.log(message.txt);
  dictionary = message.words;
  console.log("dictionary", dictionary);
}

function ready() {
  console.log("are we here?");
  chrome.runtime.onMessage.addListener(gotMessage);
}
window.onload = function() {
  ready();
};
