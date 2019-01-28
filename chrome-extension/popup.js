

$(function(){
    chrome.storage.sync.get(['total', 'words'], function(items){
        $('#total').text(items.total)
    })
    $('#addWord').click(function(){
        
        chrome.storage.sync.get(['total', 'words'],async function(items){
            let newTotal = items.total + 1
            
                newTotal = items.total + 1

            chrome.storage.sync.set({'total': newTotal})
            $('#total').text(newTotal)

            
                let opt = {
                    type: "basic",
                    title: "Word Added",
                    message: "Your word has been added",
                    iconUrl: "icon.png"
                }
                chrome.notifications.create('wordAdded', opt, function() {})
            
        })
    })
})