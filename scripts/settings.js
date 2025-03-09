emptyData = {
    id : 0,
    profiles : {}, 
    hidden : [],
    popup_on : true
}

function set_extension(on){
    chrome.storage.local.get(["tempData"], function (data) {
        data.tempData[0].popup_on = on
        chrome.storage.local.set({"tempData" : data["tempData"]}).then(() => {
            return
        });
      });
}

const run_switch = document.getElementById("run_extension");
const reset_button = document.getElementById("dataReset");
chrome.storage.local.get(["tempData"], function (data) {
    run_switch.checked =  data.tempData[0].popup_on;
    });

run_switch.addEventListener('change', function() {
    if (run_switch.checked){
        set_extension(true)
    }
    else{
        set_extension(false)
    }
})

reset_button.addEventListener('click', function() {
    chrome.storage.local.set({"tempData" : [emptyData]}).then(() => {
        run_switch.checked = true;
    });
})