const ready = () => {
  chrome.storage.sync.get(["userid", "words"], (items) => {
    const dictionary = items.words;
    const ps = [ ...document.getElementsByTagName("p") ];
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
