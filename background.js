// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
 

chrome.contextMenus.create({
  title: "View user 'about' tab. Тут есть дата регистрации", 
  id: "myUniqueIdForThisExtension123",
  contexts:["link"], 
});


 // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'youtube.com' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});


function getword(info,tab) {
  console.log("Word " + info.linkUrl + " was clicked.");
  chrome.tabs.create({  
    url: info.linkUrl + "/about",
  });           
}

chrome.contextMenus.onClicked.addListener(getword);

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "content.js"});

});


