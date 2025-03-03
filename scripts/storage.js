// temp storage script

// let s = document.getElementById('setBtn');
// if (s) {
//     s.addEventListener('click', () => {save()});
// }

// let g = document.getElementById('getBtn');
// if (g) {
//     g.addEventListener('click', () => {retrieve()});
// }

// function save(key, val) {
//     chrome.storage.local.set({ [key]: val }).then(() => {
//         return true
//       });
// }

// function remove(key) {
//     chrome.storage.local.remove([key]).then(() => {
//         return true
//       });
// }

// function retrieve(key) {
//     return new Promise(resolve => {
//         chrome.storage.local.get([key], function(items) {
//             resolve(items)
//         })
//     })
// }

// function retrieveAll() {
//     return new Promise(resolve => {
//         chrome.storage.local.get(null, function(items) {
//             resolve(items)
//         })
//     })
// }


let tempData = {
    id : 0,
    profiles : {
        1 : {
            name : "X",
            logo : "https://abs.twimg.com/responsive-web/client-web/icon-ios.77d25eba.png", // og-icon
            score : 2,
            categories : {
                1 : {
                    name : "Privacy",
                    score : 2,
                    frequency: 10,
                    summary : "Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary" 
                },
                2 : {
                    name : "Tracking",
                    score : 5,
                    frequency: 10,
                    summary : "Tracking summary" 
                },
                3 : {
                    name : "3rd Party Usage",
                    score : 1,
                    frequency: 10,
                    summary : "Tracking summary" 
                },
                4 : {
                    name : "Dispute Resolution",
                    score : 3,
                    frequency: 10,
                    summary : "Tracking summary" 
                },
                5 : {
                    name : "Fees",
                    score : 4,
                    frequency: 10,
                    summary : "Tracking summary" 
                },
                6 : {
                    name : "Warranty",
                    score : 1,
                    frequency: 10,
                    summary : "Tracking summary" 
                },
                7 : {
                    name : "User obligations",
                    score : 5,
                    frequency: 10,
                    summary : "Tracking summary" 
                },
                8 : {
                    name : "Tracking",
                    score : 5,
                    frequency: 10,
                    summary : "Tracking summary" 
                }
            }
        },
        2 : {
            name : "Facebook",
            logo : "https://www.facebook.com/apple-touch-icon.png", // apple-touch-icon
            score: 1,
            categories : {
                1 : {
                    name : "Privacy",
                    score : 2,
                    frequency: 10,
                    summary : "Privacy summary" 
                },
                2 : {
                    name : "Tracking",
                    score : 5,
                    frequency: 10,
                    summary : "Tracking summary" 
                }
            }
        },
        3 : {
            name : "Instagram",
            logo : "https://static.cdninstagram.com/rsrc.php/v4/yG/r/De-Dwpd5CHc.png", // apple-touch-icon
            score : 3,
            categories : {
                1 : {
                    name : "Privacy",
                    score : 2,
                    frequency: 10,
                    summary : "Privacy summary" 
                },
                2 : {
                    name : "Tracking",
                    score : 5,
                    frequency: 10,
                    summary : "Tracking summary" 
                }
            }
        }

    }
}

// COMMENT THIS OUT LATER
chrome.storage.local.set({"tempData" : [tempData]}, function() {
    return true
})

