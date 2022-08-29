console.log("appearance.js loaded");

if (window.useSystemScheme) {
    document.getElementById("flexRadioSystem").setAttribute("checked", "");
    // the Dark Mode switch should be disabled if using OS scheme.
    document.getElementById("flexSwitchDarkMode").setAttribute("disabled", "");
} else {
    document.getElementById("flexRadioCustom").setAttribute("checked", "");
}


// set the default state of checkbox
const darkModeSwitch = document.getElementById("flexSwitchDarkMode");
if (darkMode) {
    darkModeSwitch.setAttribute("checked", "");
} else {
    darkModeSwitch.removeAttribute("checked");
}

// if click on System Settings: disable Dark Mode switch
document.getElementById("flexRadioSystem").addEventListener("input", function (event) {
    window.useSystemScheme = true;
    document.getElementById("flexSwitchDarkMode").setAttribute("disabled", "");
    console.log("system");
    updateColorScheme();
});

// if click on Custom: enable Dark Mode switch
document.getElementById("flexRadioCustom").addEventListener("input", function (event) {
    window.useSystemScheme = false;
    document.getElementById("flexSwitchDarkMode").removeAttribute("disabled");
    console.log("custom");
    updateColorScheme();
});

document.getElementById("flexSwitchDarkMode").addEventListener("input", function (event) {
    console.log("is checked: " + this.checked);
    // only apply theme if using custom settings
    if (window.useSystemScheme === false) {
        if (this.checked === true) {
            window.darkMode = true;
        } else {
            window.darkMode = false;
        }
        updateColorScheme();
    }
});
