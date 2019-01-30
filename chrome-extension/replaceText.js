function replaceText() {
  const dictionary = {};
  chrome.storage.sync.get(["words"], function({ words }) {
    dictionary = words;
    let words = Object.keys(dictionary).filter(key =>
      dictionary.hasOwnProperty(key)
    );
    const ps = [...document.getElementsByTagName("p")];
    ps.forEach(child => {
      if (child.innerText) {
        let text = child.innerText;
        words.forEach(word => {
          if (text.includes(word)) {
            const re = new RegExp(` ${word} `, "g");
            text = text.replace(re, dictionary[word]);
          }
        });
        child.innerText = text;
      }
    });
  });
}
