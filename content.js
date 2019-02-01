const replaceWords = () => {
  chrome.storage.sync.get(["userid", "words"], items => {
    const dictionary = items.words;
    const tabWords = [...document.getElementsByTagName("p")];
    tabWords.forEach(child => {
      if (child.innerText) {
        let text = child.innerText;
        dictionary.forEach(word => {
          if (child.innerText.includes(` ${word.word} `)) {
            if(word.learned === true){
            let re = new RegExp(` ${word.word} `, "g");
            text = text.replace(re, ` <span style= color:blue>${word.translation}</span> `);
            }
          }
        });
        child.innerHTML = text;
      }
    });
  });
};

window.onload = function() {
  replaceWords();
};
