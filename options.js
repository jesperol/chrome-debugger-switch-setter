/* let page = document.getElementById("optionsDiv");
let selectedClassName = "current";
const PresetDarkModeSettings = {
  InversionAlgorithm: 3,
  ImagePolicy: 2,
  ForegroundBrightnessThreshold: 150,
  BackgroundBrightnessThreshold: 204,
  ContrastPercent: 0,
  IncreaseTextContrast: 0
};

const DarkModeInversionAlgorithms = {
  kSimpleInvertForTesting: { id: 0, desc: "Simple Invert for testing." },
  kInvertBrightness: { id: 1, desc: "Rgb based (kInvertBrightness)" },
  kInvertLightness: { id: 2, desc: "HSL based (kInvertLightness)" },
  kInvertLightnessLAB: { id: 3, desc: "CieLab based (kInvertLightnessLAB)" }
};

const DarkModeImagePolicies = {
   kFilterAll: { id: 0, desc: "Apply dark-mode filter to all images." },
   kFilterNone: { id: 1, desc: "Never apply dark-mode filter to any images." },
   kFilterSmart: { id: 2, desc:  "Apply dark-mode based on image content." }
};

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  chrome.storage.sync.set({ darkModeSettings });
  console.log('Stored background color set to %c%s', `color: ${color}`, color);
}

// Add a button to the page for each supplied color
function constructCommandLine(darkModeSettings) {
  chrome.storage.sync.get("darkModeSettings", (data) => {
    let currentSettings = data.darkModeSettings || PresetDarkModeSettings;

    const switchString = "";
 
    let select = document.createElement("select");
    select.id = select.name = "darkModeInversionAlgorith";
    
    for (const [key, value] of Object.entries(DarkModeInversionAlgorithms))
    {
        var option = document.createElement("option");
        option.value = key;
        option.text = value
        select.appendChild(option);
    }
    select.addEventListener("select", handleInputEvent);
 
    var label = document.createElement("label");
    label.innerHTML = "Dark Mode Inversion Algorith: "
    label.htmlFor = "darkModeInversionAlgorithm";
 
    document.getElementById("optionsDiv").appendChild(label).appendChild(select);

    select = document.createElement("select");
    select.id = select.name = "darkModeImagePolicy";
    
    for (const [key, value] of Object.entries(DarkModeImagePolicies))
    {
        var option = document.createElement("option");
        option.value = key;
        option.text = value
        select.appendChild(option);
    }
    select.addEventListener("select", handleInputEvent);
 
    var label = document.createElement("label");
    label.innerHTML = "Dark Mode Inversion Algorith: "
    label.htmlFor = "darkModeInversionAlgorithm";
 
    document.getElementById("optionsDiv").appendChild(label).appendChild(select);
  }
}

function handleInputEvent(event) {
  document.getElementById("commandLineSwitches").innerHTML = '--dark-mode-settings=' +
      Object.entries(presetDarkModeSettings).map((item) => item.join('=')).join(',');
});

// Initialize the page by constructing the color options

*/