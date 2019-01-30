function replaceText() {
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

function ready() {
  chrome.storage.sync.get(["userid", "words"], function(items) {
    const dictionary = items.words;
    const ps = [...document.getElementsByTagName("p")];
    ps.forEach(child => {
      if (child.innerText) {
        let text = child.innerText;
        dictionary.forEach(word => {
          if (child.innerText.includes(word.word)) {
            const re = new RegExp(word.word, "g");
            text = text.replace(re, word.translation);
          }
        });
        child.innerText = text;
      }
    });
  });
}
window.onload = function() {
  ready();
};
