$(function(){
    chrome.storage.sync.get(['total', 'words'], function(items){
        $('#total').text(items.total)
        parentDiv = document.querySelector('#saved')

        items.words.map(word => {
            console.log(word)
            childElement = document.createElement('h2')
            appendElement = parentDiv.appendChild(childElement)
            appendElement.innerHTML = word["translation"] +  ":" + word["word"]
        })
    })
    $('#reset').click(function(){
        chrome.storage.sync.set({'total': 0, 'words': []}, function(){
            let opt = {
                type: "basic",
                title: "Total Reset!",
                message: "Your saved words have been reset",
                iconUrl: "icon.png"
            }
            chrome.notifications.create('reset', opt, function() {})
            close()
        })
    })
    
})





