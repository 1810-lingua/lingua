const menuItem = {
  id: "Lingua",
  title: "Add Word to Lingua",
  contexts: ["selection"]
};

const translate = async (word, languageValue) => {
  const apiKey =
    "trnsl.1.1.20190126T211920Z.755eef10f6ae2719.f84530139cfd895621304f2b1ed34456a340ebb6";
  const baseUrl =
    "https://translate.yandex.net/api/v1.5/tr.json/translate?key=";
  const text = "&text=";
  const lang = "&lang=";
  const languages = {
    spanish: "es",
    french: "fr",
    german: "de",
    italian: "it",
    portuguese: "pt",
    polish: "pl"
  };
  let safeWord = word.replace(/[.]/gi, "");
  const fullUrl =
    baseUrl + apiKey + lang + languages[languageValue] + text + safeWord;
  try {
    const request = new Request(fullUrl, { method: "GET" });
    const response = await fetch(request);
    const text = await response.text();
    return JSON.parse(text).text[0];
  } catch (err) {
    console.log("Error: " + err);
  }
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(clickData => {
  const selection = clickData.selectionText;
  chrome.storage.sync.get(["languageValue", "userid"], async item => {
    let type = item.languageValue || "spanish";
    if (clickData.menuItemId == "Lingua" && selection) {
      const translatedSelection = await translate(selection, type);
      const newRef = firebase
        .database()
        .ref(`/${item.userid}/${type}/${selection}/`);
      await newRef.set({
        word: selection,
        translation: translatedSelection,
        learned: false
      });
    }
  });
});
