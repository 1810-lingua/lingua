const replaceWords = () => {
  chrome.storage.sync.get(["userid", "words"], (items) => {
    const dictionary = items.words;
    const tabWords = [ ...document.getElementsByTagName("p") ];
    tabWords.forEach(child => {
      if (child.innerText) {
        const text = child.innerText;
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
  replaceWords();
};
