const menuItem = {
  id: "Lingua",
  title: "Add Word to Lingua",
  contexts: ["selection"]
};

const translate = async word => {
  const apiKey =
    "trnsl.1.1.20190126T211920Z.755eef10f6ae2719.f84530139cfd895621304f2b1ed34456a340ebb6";
  const baseUrl =
    "https://translate.yandex.net/api/v1.5/tr.json/translate?key=";
  const text = "&text=";
  const lang = "&lang=es";
  let safeWord = word.replace(/[.]/gi, "");
  const fullUrl = baseUrl + apiKey + lang + text + safeWord;
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

chrome.contextMenus.onClicked.addListener(async clickData => {
  const selection = clickData.selectionText;
  if (clickData.menuItemId == "Lingua" && selection) {
    const translatedSelection = await translate(selection);
    chrome.storage.sync.get(["userid"], async user => {
      const newRef = firebase
        .database()
        .ref(`/${user.userid}/spanish/${selection}/`);
      await newRef.set({
        word: selection,
        translation: translatedSelection,
        learned: false
      });
    });
  }
});
