const replaceWords = () => {
  chrome.storage.sync.get(["userid", "words"], items => {
    const dictionary = items.words;
    const tabWords = [...document.getElementsByTagName("p")];
    tabWords.forEach(child => {
      if (child.innerText) {
        let text = child.innerText;
        dictionary.forEach(word => {
          if (child.innerText.includes(` ${word.word} `)) {
            if (word.learned === true) {
              let re = new RegExp(` ${word.word} `, "g");
              text = text.replace(
                re,
                ` <span class="translated">
                      ${word.translation}
                      <span class="translated_hovercard">
                                  ${word.word}
                      </span>
                  </span>
                  <span class="translated_print">
                      ${word.word}
                  </span>`
              );
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
