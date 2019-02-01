$(function() {
  chrome.storage.sync.get(["words"], function(items) {
    parentDiv = document.querySelector("#saved");
    if (items.words) {
      items.words.map(word => {
        childElement = document.createElement("h2");
        appendElement = parentDiv.appendChild(childElement);
        appendElement.innerHTML = word["word"] + " : " + word["translation"];
      });
    }
  });
});
