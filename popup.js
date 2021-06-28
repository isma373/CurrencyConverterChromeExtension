// This callback function is called when the content script has been 
// injected and returned its results
function onPageDetailsReceived(pageDetails)  { 
    //document.getElementById('title').value = pageDetails.title; 
    //document.getElementById('url').value = pageDetails.url; 

    var valueMoney = pageDetails.czkText;
    var eurConst = 0.038248;

    valueMoney = valueMoney.replace(/\D/g,'');
    document.getElementById('czkText').innerText = valueMoney; 

//Get daily exchange rates for EUR directly from European Central Bank
var req = new XMLHttpRequest();
req.open('GET', 'http://www.ecb.int/stats/eurofxref/eurofxref-daily.xml', false);
req.send(null);

var xmlout = req.responseText;

//Rate will come as a clean value from the XML received. Only against EURO. 
var currencyRate = substringBetween(xmlout,"CZK","Cube");

//Check if values are numbers or not
    if(isNaN(valueMoney)){

    document.getElementById('eurText').innerText =  "NA";

    }else{    

    document.getElementById('eurText').innerText =   valueMoney / currencyRate;

    }

}

//Getting data from XML (harcoded as fuck :D )
function substringBetween(s, a, b) {
    var p = s.indexOf(a) + a.length + 8;
    return s.substring(p, s.indexOf(b, p)-8);
}


// Global reference to the status display SPAN
var statusDisplay = null;


// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    chrome.runtime.getBackgroundPage(function(eventPage) {
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});