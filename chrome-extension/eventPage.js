let menuItem = {
  id: "Lingua",
  title: "Add Word to Lingua",
  contexts: ["selection"]
};

async function translate(word) {
  let api =
    "trnsl.1.1.20190126T211920Z.755eef10f6ae2719.f84530139cfd895621304f2b1ed34456a340ebb6";
  let baseurl = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=";
  let text = "&text=";
  let lang = "&lang=es";

  let fullUrl = baseurl + api + lang + text + word;
  try {
    request = new Request(fullUrl, { method: "GET" });

    let response = await fetch(request);
    console.log(response.text);
    let text = await response.text();
    console.log(text);

    console.log("tesssssttt: " + JSON.parse(text).text);
    return JSON.parse(text).text;
  } catch (err) {
    console.log("Error: " + err);
  }
}

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(async function(clickData) {
  console.log(clickData);
  let selection = clickData.selectionText;
  console.log(selection);
  if (clickData.menuItemId == "Lingua" && selection) {
    console.log(selection);
    let translatedSelection = await translate(selection);
    console.log("translatedText:" + translatedSelection);
    chrome.storage.sync.get(["total", "words"], function(items) {
      if (!items.words) {
        items.words = [];
      }
      let newTotal = items.total + 1 || 1;
      let newWords = [
        ...items.words,
        { translation: translatedSelection, word: selection }
      ];
      chrome.storage.sync.set({ total: newTotal, words: newWords });
    });
  }
});
