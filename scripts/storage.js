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

const categoryMap = {
    1  : "Grant of License",
    2  : "Restrictions of Use",
    3  : "Ownership & IP",
    4  : "User responsibilities",
    5  : "Privacy & Data",
    6  : "Security",
    7  : "Third-party Services",
    8  : "Fees and Payments",
    9  : "Updates and Modifications",
    10 : "Support and Maintenance",
    11 : "Warranties",
    12 : "Liability",
    13 : "Dispute Resolution",
    14 : "Governing Law",
    15 : "Changes to EULA"
}


let tempData = {
    id : 0,
    profiles : {
        1 : {
            name : "X",
            hostname : "x.com",
            logo : "https://abs.twimg.com/responsive-web/client-web/icon-ios.77d25eba.png", // og-icon
            score : 2,
            categories : {
                1 : {
                    score : 2,
                    frequency: 10,
                    summary : "Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary Privacy summary" 
                },
                2 : {
                    score : 5,
                    frequency: 10,
                    summary : "Tracking summary" 
                },
                3 : {
                    score : 1,
                    frequency: 10,
                    summary : "Tracking summary" 
                },
                4 : {
                    score : 3,
                    frequency: 10,
                    summary : "Tracking summary" 
                },
                5 : {
                    score : 4,
                    frequency: 10,
                    summary : "Tracking summary" 
                },
                6 : {
                    score : 1,
                    frequency: 10,
                    summary : "Tracking summary" 
                },
                7 : {
                    score : 5,
                    frequency: 10,
                    summary : "Tracking summary" 
                },
                8 : {
                    score : 5,
                    frequency: 10,
                    summary : "Tracking summary" 
                }
            }
        },
        2 : {
            name : "Facebook",
            hostname : "www.facebook.com",
            logo : "https://www.facebook.com/apple-touch-icon.png", // apple-touch-icon
            score: 1,
            categories : {
                1 : {
                    score : 2,
                    frequency: 10,
                    summary : "Privacy summary" 
                },
                2 : {
                    score : 5,
                    frequency: 10,
                    summary : "Tracking summary" 
                }
            }
        },
        3 : {
            name : "Instagram",
            hostname : "www.instagram.com",
            logo : "https://static.cdninstagram.com/rsrc.php/v4/yG/r/De-Dwpd5CHc.png", // apple-touch-icon
            score : 3,
            categories : {
                1 : {
                    score : 2,
                    frequency: 10,
                    summary : "Privacy summary" 
                },
                2 : {
                    score : 5,
                    frequency: 10,
                    summary : "Tracking summary" 
                }
            }
        }

    }, 
    hidden : [],
    popup_on : true
}

// COMMENT THIS OUT LATER
chrome.storage.local.get(["tempData"], function(data) {
    if(data == null){
        console.log("init")
        chrome.storage.local.set({"tempData" : [tempData]}, function() {
        return true
    })}
    
})




