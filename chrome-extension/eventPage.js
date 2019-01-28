let menuItem = {
    "id": "Lingua",
    "title": "Add Word to Lingua",
    "contexts": ["selection"]
}

async function translate(word){
    let api = 'trnsl.1.1.20190126T211920Z.755eef10f6ae2719.f84530139cfd895621304f2b1ed34456a340ebb6'
    let baseurl = "https://translate.yandex.net/api/v1.5/tr.json/translate?key="
    let text = "&text="
    let lang = "&lang=es"

    let fullUrl = baseurl + api + lang + text + word
    try{
        request = new Request(fullUrl, {method: 'GET'})


        let response = await fetch(request)
        console.log(response.text)
        let text = await response.text()
        console.log(text)
    
        console.log('tesssssttt: '+JSON.parse(text).text)
            return JSON.parse(text).text
    }
    catch(err) {
        console.log("Error: " + err)
    }
    
}


chrome.contextMenus.create(menuItem)

chrome.contextMenus.onClicked.addListener(async function  (clickData){
    console.log(clickData)
    let selection = clickData.selectionText
    console.log(selection)
    if(clickData.menuItemId == "Lingua" && selection){
        console.log(selection)
        let translatedSelection = await translate(selection)
        console.log("translatedText:" + translatedSelection)
            chrome.storage.sync.get(['total', 'words'], async function(items){
                let newTotal = items.total + 1 || 1
                let newWords = [...items.words, {translation: translatedSelection, word: selection}]
                await chrome.storage.sync.set({'total': newTotal, 'words': newWords})
            })
    }
})

chrome.storage.onChanged.addListener(function(changes){
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()})
})

const config = {
    apiKey: "AIzaSyBOGOfm3qgA0x8O_f-a3ButyIhyeFwb1V8",
    authDomain: "lingua-632b7.firebaseapp.com",
    databaseURL: "https://lingua-632b7.firebaseio.com",
    projectId: "lingua-632b7",
    storageBucket: "lingua-632b7.appspot.com",
    messagingSenderId: "349838454101"
   };
   
   const app = firebase.initializeApp(config)
   const db = app.database()

