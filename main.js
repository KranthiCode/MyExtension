openInScreener = function(word){
  var query = word.selectionText;
  chrome.tabs.create({url: "https://www.screener.in/company/" + query + "/consolidated/"});
};

chrome.contextMenus.create({
  id: "openInScreener",
  title: "Open in Screener",
  contexts:["selection"],
});

openInTradingView = function(word){
  var query = word.selectionText.replace(/&/g, "_");
  chrome.tabs.create({url: "https://www.tradingview.com/chart?symbol=NSE:" + query});
};

chrome.contextMenus.create({
  id: "openInTradingView",
  title: "Open in TradingView",
  contexts:["selection"],
});

openInEpoch = function(word){
  chrome.tabs.create({url: "https://www.epochconverter.com/?source=searchbar&q=" + word.selectionText});
};

chrome.contextMenus.create({
  id: "openInEpoch",
  title: "Check in Epoch",
  contexts:["selection"],
});

openYoutubeResults = function(word){
  chrome.tabs.create({url: "https://www.youtube.com/results?search_query="+word.selectionText});
};

chrome.contextMenus.create({
  id: "openYoutubeResults",
  title: "Search Youtube",
  contexts:["selection"],
});

openProtoViewFromLink = function(word){
  var query = word.linkUrl.replace(/view/g,"proto");
  query = query.replace(/offer-porsche/g, "offer");
  query = query.replace(/voucher/g,"offer");
  chrome.tabs.create({url: query, active:false});
};

chrome.contextMenus.create({
  id: "openProtoViewFromLink",
  title: "Open Proto View",
  contexts:["link"],
});

openOfferViewFromPage = function(word){
  var query = word.pageUrl.replace(/proto/g,"view");
  query = query.replace(/offer/g,"offer-porsche");
  chrome.tabs.update(undefined,{url: query});
};

chrome.contextMenus.create({
  id: "openOfferViewFromPage",
  title: "Open Offer View",
  contexts:["page"],
});

openProtoViewFromPage = function(word){
  var query = word.pageUrl.replace(/view/g,"proto");
  query = query.replace(/offer-porsche/g, "offer");
  query = query.replace(/voucher/g,"offer");
  chrome.tabs.update(undefined,{url: query});
};

chrome.contextMenus.create({
  id: "openProtoViewFromPage",
  title: "Open Proto View",
  contexts:["page"],
});

chrome.contextMenus.onClicked.addListener(function(info,tab){
  switch(info.menuItemId) {
    case 'openInScreener':
      openInScreener(info);
      break;
    case 'openInTradingView':
      openInTradingView(info);
      break;
    case 'openInEpoch':
      openInEpoch(info);
      break;
    case 'openYoutubeResults':
      openYoutubeResults(info);
      break;
    case 'openProtoViewFromLink':
      openProtoViewFromLink(info);
      break;
    case 'openOfferViewFromPage':
      openOfferViewFromPage(info);
      break;
    case 'openProtoViewFromPage':
      openProtoViewFromPage(info);
      break;
  }
});

chrome.commands.onCommand.addListener(function(command) {
  switch (command) {
    case 'open_proto':
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
