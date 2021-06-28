// Send a message containing the page details back to the event page
chrome.runtime.sendMessage({
    'czkText': window.getSelection().toString()
        //'eurText': window.getSelection().toString();
//comment
//some more changes in files

});