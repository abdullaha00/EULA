// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'injectLibraries') {
//       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         const tabId = tabs[0].id;
  
//         // Inject first script
//         chrome.scripting.executeScript({
//           target: { tabId: tabId },
//           files: ['lib/d3.v7.min.js']
//         }, () => {
//           // Inject second script after the first one
//           chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             files: ['lib/create_arc.js']
//           });
//         });
//       });
//     }
//   });