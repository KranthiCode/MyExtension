openInScreener = function(word){
  var query = word.selectionText;
  chrome.tabs.create({url: "https://www.screener.in/company/" + query + "/consolidated/"});
};

chrome.contextMenus.create({
  title: "Open in Screener",
  contexts:["selection"],
  onclick: openInScreener
});

openInTradingView = function(word){
  var query = word.selectionText.replace(/&/g, "_");
  chrome.tabs.create({url: "https://www.tradingview.com/chart?symbol=NSE:" + query});
};

chrome.contextMenus.create({
  title: "Open in TradingView",
  contexts:["selection"],
  onclick: openInTradingView
});

openInEpoch = function(word){
  chrome.tabs.create({url: "https://www.epochconverter.com/?source=searchbar&q=" + word.selectionText});
};

chrome.contextMenus.create({
  title: "Check in Epoch",
  contexts:["selection"],
  onclick: openInEpoch
});

openProtoViewFromLink = function(word){
  var query = word.linkUrl.replace(/view/g,"proto");
  chrome.tabs.create({url: query, active:false});
};

chrome.contextMenus.create({
  title: "Open Proto View",
  contexts:["link"],
  onclick: openProtoViewFromLink
});

openProtoViewFromPage = function(word){
  var query = word.pageUrl.replace(/view/g,"proto");
  query = query.replace(/voucher/g,"offer");
  console.log(query);
  chrome.tabs.update(undefined,{url: query});
  // chrome.tabs.create({url: "https://www.tradingview.com/chart?symbol=NSE:" + query});
  // //chrome.tabs.create({url: "https://en.wikipedia.org/w/index.php?search=" + query + "&title=Special%3ASearch&go=Go"});
};

chrome.contextMenus.create({
  title: "Open Proto View",
  contexts:["page"],
  onclick: openProtoViewFromPage
});

openOfferViewFromPage = function(word){
  var query = word.pageUrl.replace(/proto/g,"view");
  query = query.replace(/offer/g,"offer-porsche");
  chrome.tabs.update(undefined,{url: query});
};

chrome.contextMenus.create({
  title: "Open Offer View",
  contexts:["page"],
  onclick: openOfferViewFromPage
});

chrome.commands.onCommand.addListener(function(command) {
  switch (command) {
    case 'open_proto':
      console.log("Open Proto called");
      chrome.tabs.query({currentWindow: true, active: true}, function(results) {
        if (results.length != 1) return;
        var tab = results[0];
        var query = tab.url.replace(/view/g,"proto");
        query = query.replace(/voucher/g,"offer");
        query = query.replace(/-porsche/g,"");
        chrome.tabs.update(undefined,{url: query});
      });
      break;
    case 'open_offer_view':
      chrome.tabs.query({currentWindow: true, active: true}, function(results) {
        if (results.length != 1) return;
        var tab = results[0];
        var query = tab.url.replace(/proto/g,"view");
        query = query.replace(/offer/g,"offer-porsche");
        chrome.tabs.update(undefined,{url: query});
      });
      break;
    case 'open_voucher_view':
      chrome.tabs.query({currentWindow: true, active: true}, function(results) {
        if (results.length != 1) return;
        var tab = results[0];
        var query = tab.url.replace(/proto/g,"view");
        query = query.replace(/offer/g,"voucher");
        chrome.tabs.update(undefined,{url: query});
      });
  }
});