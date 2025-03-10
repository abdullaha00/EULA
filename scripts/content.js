// automatic popup script

// chrome.storage.local.get(["tempData"], function (data) {
//   console.log("all data:", data.tempData[0])
// });

const link_words = ["policy", "terms", "privacy", "notice"];
const base = 'https://as3495.user.srcf.net/';
let initHidden

let uniqueLinks = []; //store unique links to use in showPopup()

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

const colors = {
  red :   "rgb(255,69,58)",
  orange: "rgb(255,159,10)",
  yellow: "rgb(255,214,10)",
  green:  "rgb(48,209,88)",
  mint:   "rgb(99,230,226)",
  teal:   "rgb(64,200,224)",
  cyan:   "rgb(100,210,255)",
  blue:   "rgb(10,132,255)",
  indigo: "rgb(94,92,230)",
  purple: "rgb(191,90,242)",
  pink:   "rgb(255,55,95)"
}

function getRandomColor() {
  const keys = Object.keys(colors);
  return colors[keys[ keys.length * Math.random() << 0]];
}

const color = getRandomColor()

function contextualise_link(icon_link){
  if (icon_link.slice(0,1) == "/"){
    console.log("icon link", window.location.origin.concat(icon_link))
    return window.location.origin.concat(icon_link)
  }
    console.log("icon link", icon_link)
    return icon_link
}

function getPageIcon() {

  // find icons from link tags
  const links = document.getElementsByTagName("link")
  for (const link of links) {
    if (link.getAttribute("rel") == "apple-touch-icon" || (link.getAttribute("rel") == "icon" && link.getAttribute("rel")=="image/png")) {
      return contextualise_link(link.getAttribute("href"))
    }
  }

  // find icons from meta tags
  const meta = document.getElementsByTagName("meta")
  for (const tag of meta) {
    if (tag.getAttribute("property")=="og:image") {
      return contextualise_link(tag.getAttribute("content"))
    }
  }
  
  // no page icon found
  return false
}

function addProfile() {

  
  
}

function addHiddenProfile() {
  currentHost = window.location.hostname;

  chrome.storage.local.get(["tempData"], function (data) {
    let newData = data.tempData[0]
    let newHidden = newData.hidden
    console.log(newHidden);
    
    let hasIcon = true
    let icon = getPageIcon()
    console.log("icon is:", icon)

    if (!icon) {
      hasIcon = false
      icon = color
    }

    const entry = {
      hasLogo: hasIcon,
      logo: icon
    }


    newHidden[currentHost] = entry
    newData.hidden = newHidden
    console.log(newData.hidden);
    console.log("coming soon:", newData)

    chrome.storage.local.set({"tempData" : [newData]}).then(() => {
      closePopup()
    });
  });
  setTimeout(() => {chrome.storage.local.get(["tempData"], function (data) { console.log("new!!", data.tempData[0])})
}, 1000);

}



function hidePopup() {
  // hide popup
  const popup = document.getElementById("popup-host").shadowRoot.getElementById("popup-container")
  popup.style.display = "none"

  // add button to redisplay popup
  const reshowPopupButton = document.getElementById("popup-host").shadowRoot.getElementById("reshow-popup-button")
  reshowPopupButton.style.display = "block"
}

function closePopup() {
  const popup = document.getElementById("popup-host").shadowRoot.getElementById("popup-container")
  popup.style.display = "none"
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function showHint(e) {
  const id = e.currentTarget.id
  const categoryHint = document.getElementById("popup-host").shadowRoot.getElementById(`popup-category-hint-${id}`)
  categoryHint.style.display = "inline-block"
}

function hideHint(e) {
  const id = e.currentTarget.id
  const categoryHint = document.getElementById("popup-host").shadowRoot.getElementById(`popup-category-hint-${id}`)
  categoryHint.style.display = "none"
}

function moveHint(e) {
  const rect = e.currentTarget.getBoundingClientRect();

  const id = e.currentTarget.id
  const categoryHint = document.getElementById("popup-host").shadowRoot.getElementById(`popup-category-hint-${id}`)
  
  categoryHint.style.transform = `translateX(${e.clientX-rect.left}px) translateY(${e.clientY - rect.top}px)`
}



function showPopup() {

  const host = document.createElement("span")
  host.setAttribute("id", "popup-host")
  host.style.all = "initial" // prevent webpage styling affecting us
  const shadow = host.attachShadow({mode: "open"})

  const reshowPopupButton = document.createElement("div")
  reshowPopupButton.setAttribute("id", "reshow-popup-button")
  reshowPopupButton.style.backgroundImage = `url(${chrome.runtime.getURL("resources/EULAV.svg")})`
  reshowPopupButton.addEventListener("click", () => {popupContainer.style.display = "block"; reshowPopupButton.style.display = "none"})
  reshowPopupButton.style.display = "none" // hide for now

  const loadingButton = document.createElement("div")
  loadingButton.setAttribute("id", "reshow-popup-button")
  loadingButton.style.backgroundImage = `url(${chrome.runtime.getURL("resources/extension-icons/ring-resize.svg")})`
  loadingButton.addEventListener("click", () => {popupContainer.style.display = "block"; reshowPopupButton.style.display = "none"})
  //loadingButton.style.display = "none" // hide for now
  

  const popupContainer = document.createElement("div")
  popupContainer.setAttribute("id", "popup-container")
  popupContainer.classList.add("popup-container")
  dragElement(popupContainer)
  
  const headerContainer = document.createElement("div")
  headerContainer.classList.add("popup-header-container")

  const logoContainer = document.createElement("div")
  logoContainer.classList.add("popup-logo-container")
  const logo = document.createElement("img")
  logo.src = chrome.runtime.getURL("resources/EULAV.svg")
  logo.classList.add("popup-logo")
  const logoName = document.createElement("div")
  logoName.classList.add("popup-logo-name")
  logoName.innerText = "EULAV"

  logoContainer.appendChild(logo)
  logoContainer.appendChild(logoName)
  
  headerContainer.appendChild(logoContainer)

  const closeButton = document.createElement("div")
  closeButton.classList.add("popup-corner-button")
  closeButton.innerHTML = "&times"
  closeButton.addEventListener("click", closePopup)

  const hideButton = document.createElement("div")
  hideButton.classList.add("popup-corner-button")
  hideButton.classList.add("popup-hide-button")
  hideButton.innerHTML ="&#8964"
  hideButton.addEventListener("click", hidePopup)

  const footerContainer = document.createElement("div")
  footerContainer.classList.add("popup-footer")

  const addButton = document.createElement("div")
  addButton.classList.add("add-button")
  addButton.classList.add("popup-bottom-button")
  addButton.innerText = "Add Profile"
  addButton.addEventListener("click", addProfile) // TODO

  const dontShowButton = document.createElement("div")
  dontShowButton.classList.add("dont-show-button")
  dontShowButton.classList.add("popup-bottom-button")
  dontShowButton.innerText = "Don't Show On This Site "
  dontShowButton.addEventListener("click", addHiddenProfile) // TODO

  footerContainer.appendChild(addButton)
  footerContainer.appendChild(dontShowButton)

  headerContainer.appendChild(closeButton)
  headerContainer.appendChild(hideButton)

  const infoContainer = document.createElement("div")
  infoContainer.classList.add("popup-info-container")
  

  // set the page icon to default if no page icon found
  let siteIcon
  const pageIconSrc = getPageIcon()
  if (!pageIconSrc) {
    siteIcon = document.createElement("div")
    siteIcon.classList.add("popup-site-icon")
    siteIcon.classList.add("popup-site-default-icon")

    // get the letter to be displayed instead
    const name = window.location.hostname
    let letter = name[0]
    if (name.length > 3 && name.substring(0,3)=="www") {
      letter = name[4]
    }
    siteIcon.innerText = letter.toUpperCase()

    // set random background color
    siteIcon.style.backgroundColor = color

  } else {
    siteIcon = document.createElement("img")
    siteIcon.classList.add("popup-site-icon")
    siteIcon.src = pageIconSrc
  }
  
  const siteName = document.createElement("div")
  siteName.classList.add("popup-site-name")
  siteName.innerText = window.location.hostname
  const siteBackground = document.createElement("div")
  siteBackground.classList.add("popup-site-background")

  infoContainer.appendChild(siteIcon)
  infoContainer.appendChild(siteName)
  infoContainer.appendChild(siteBackground)


  const arcsContainer = document.createElement("div")
  arcsContainer.classList.add("popup-arcs-container")

  const mainScoreArcContainer = document.createElement("div")
  mainScoreArcContainer.classList.add("popup-main-score-arc-container")





  const categoriesContainer = document.createElement("div")
  categoriesContainer.classList.add("popup-categories-container")


  arcsContainer.appendChild(mainScoreArcContainer)
  arcsContainer.appendChild(categoriesContainer)

  popupContainer.appendChild(headerContainer)
  popupContainer.appendChild(infoContainer)
  popupContainer.appendChild(arcsContainer)
  popupContainer.appendChild(footerContainer)

  // load fonts
  const poppinsFontFace = new FontFace('Poppins', `url(${chrome.runtime.getURL("resources/fonts/Poppins/Poppins-Regular.ttf")})`);
  poppinsFontFace.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      popupContainer.style.fontFamily = "'Poppins', sans-serif"
  }).catch((err) => console.error("Font failed to load:", err));
  
  const poppinsMediumFontFace = new FontFace('Poppins-medium', `url(${chrome.runtime.getURL("resources/fonts/Poppins/Poppins-Medium.ttf")})`);
  poppinsMediumFontFace.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      siteIcon.style.fontFamily = "'Poppins-medium', sans-serif"
      footerContainer.style.fontFamily = "'Poppins-medium', sans-serif"
      arcsContainer.style.fontFamily = "'Poppins-medium', sans-serif"
  }).catch((err) => console.error("Font failed to load:", err));
  
  const montserratFontFace = new FontFace('Montserrat', `url(${chrome.runtime.getURL("resources/fonts/Montserrat/static/Montserrat-Bold.ttf")})`);
  montserratFontFace.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      logoName.style.fontFamily = "'Montserrat', sans-serif"
  }).catch((err) => console.error("Font failed to load:", err));

  


  // add styling
  const style = document.createElement("link")
  style.type = "text/css"
  style.rel = "stylesheet"
  style.href = chrome.runtime.getURL("popup/styles/popup.css")

  // overlay popup onto document

  shadow.appendChild(style)

  shadow.appendChild(popupContainer)
  shadow.appendChild(reshowPopupButton)
  shadow.appendChild(loadingButton)

  document.body.appendChild(host);
  // document.body.appendChild(reshowPopupButton)

  popupContainer.style.display = "none";

  //// update using parsed version of first element in fetchedResults for now
  
  fetch(base.concat(encodeURIComponent(encodeURIComponent(uniqueLinks[0])))) // TODO: parse and update more than just link1 and update dynamically
    .then(res => res.json())
    .then(data => {

        analyzeEulaText(data.texts.join(" ")).then(data => {
        // analyzeEulaText(" ").then(data => {
        //   data={
        //     "raw": [],
        //     "ranked": [],
        //     "triples": [],
        //     "categoryAverages": {
        //         "Grant of License": 1,
        //         "Restrictions of Use": 2,
        //         "Ownership & IP": 3,
        //         "User responsibilities": 4,
        //         "Privacy & Data": 5,
        //         "Security": 1,
        //         "Third-party Services": 2,
        //         "Fees and Payments": 0,
        //         "Updates and Modifications": 3,
        //         "Support and Maintenance": 4,
        //         "Warranties": 0,
        //         "Liability": 1,
        //         "Dispute Resolution": 5,
        //         "Governing Law": 2,
        //         "Changes to EULA": 3
        //     }
        // }
        loadingButton.style.display = "none" 
        popupContainer.style.display = "";
        //analyzeEulaText(" ").then(data => {
        console.log("this is the data")
          console.log(data);
        

        const vals = Object.values(data.categoryAverages);
        const sum = vals.reduce((acc, val) => acc + val, 0);
        const avg = Math.floor(sum / vals.length); // replace main arc with sum
        
        const mainScoreArc = createScoreArc(avg, 180)
        mainScoreArc.classList.add("popup-main-score-arc")
        const mainScoreValue = document.createElement("div")
        mainScoreValue.classList.add("popup-main-score-value")
        mainScoreValue.innerText = `${sum}/150`
      
        mainScoreArcContainer.appendChild(mainScoreArc)
        mainScoreArcContainer.appendChild(mainScoreValue)
      
        const valuesArray = Object.values(data.categoryAverages);


        for ([id, val] of Object.entries(categoryMap)) {
          const categoryContainer = document.createElement("div")
          const categoryIcon = document.createElement("div")
          const categoryArc = createScoreArc(valuesArray[id-1], 80)
          
          categoryContainer.classList.add("popup-category-container")
          categoryIcon.classList.add("popup-category-icon")
          categoryArc.classList.add("popup-category-arc")

          const url = `resources/icons/${id}.svg`
          categoryIcon.style.backgroundImage = `url(${chrome.runtime.getURL(url)})`


          const categoryHint = document.createElement("div")
          categoryHint.classList.add("popup-category-hint")
          categoryHint.setAttribute("id", `popup-category-hint-${id}`)
          categoryHint.innerText = categoryMap[id]
          categoryHint.style.display = "none" // initially hidden

          categoryContainer.id = id
          categoryContainer.addEventListener("mouseenter", showHint)
          categoryContainer.addEventListener("mouseleave", hideHint)
          categoryContainer.addEventListener("mousemove", moveHint)

          categoryContainer.appendChild(categoryHint)
          categoryContainer.appendChild(categoryIcon)
          categoryContainer.appendChild(categoryArc)
          categoriesContainer.appendChild(categoryContainer)

        }

    

      });
    })
}

function scrape_links(){
    const relevant_links = Array.from(document.querySelectorAll('a'))
    .filter(a => link_words.some(phrase => a.textContent.toLowerCase().includes(phrase)))
    .map(a => a.href);

    uniqueLinks = [...new Set(relevant_links)];
    uniqueLinks.forEach(link => {
        fetch(base.concat(encodeURIComponent(encodeURIComponent(link))))
        .then(res => res.json())
        .then(data => {
          console.log(data);
    })
    });
    return uniqueLinks.length
};

chrome.storage.local.get(["tempData"], function (data) {
  console.log(data["tempData"][0])
  const tempData = data.tempData[0] 
  let match = false
  let currentHost = window.location.hostname;
  console.log(currentHost)
  for (const id in tempData.profiles){
      if (currentHost === tempData.profiles[id].hostname){
          match = true;
          break;
      }
  }

  // for (const host of Object.keys(tempData.hidden)){
  //   console.log("hcts ....", host)
  //   if (currentHost === host){
  //     console.log("match!")
  //     match = true;
  //     break;
  //   }
  // }

  if (tempData.hidden[currentHost]) {
    match = true
  }
  

  if (!match){
      setTimeout(() => {
          let found = scrape_links();
          if (found > 0){
            showPopup()
          }
          
      }, 1000);
  };
  });
