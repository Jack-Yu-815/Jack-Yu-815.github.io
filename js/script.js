// set default custom scheme
window.darkMode = false; // only used if window.useSystemScheme is false

// set which preference to obey: OS or custom scheme
window.useSystemScheme = false;

// TODO: implement navbar menu auto-collapse
// $(function () { // Same as document.addEventListener("DOMContentLoaded"...
//     // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
//     $(".navbar-toggler").blur(function (event) {
//         var screenWidth = window.innerWidth;
//         if (screenWidth < 768) {
//             $("#navbarNav").collapse('hide');
//         }
//     });
//
//     // In Firefox and Safari, the click event doesn't retain the focus
//     // on the clicked button. Therefore, the blur event will not fire on
//     // user clicking somewhere else in the page and the blur event handler
//     // which is set up above will not be called.
//     // Refer to issue #28 in the repo.
//     // Solution: force focus on the element that the click event fired on
//     $(".navbar-toggler").click(function (event) {
//         $(event.target).focus();
//     });
// });

document.addEventListener("DOMContentLoaded", function (event) {
    updateColorScheme(event);

    // offset navbar so that it always floats on the top of the page.
    document.addEventListener("scroll", function (event) {
        let offsetY = window.scrollY;
        window.navHeight = document.querySelector("nav").offsetHeight;
        if (offsetY >= 0) {
            document.querySelector("nav").style.top = offsetY.toString() + "px";
        }
    });

    // change color scheme when user changes color scheme preference
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", updateColorScheme);
});


/**
 * load the correct color scheme for the device's OS.
 * @param {Event} event - the event object
 */
function updateColorScheme(event) {
    if (useSystemScheme) {
        if (matchMedia("(prefers-color-scheme: dark)").matches) {
            setDarkMode();
        } else {
            setLightMode();
        }
    } else {
        console.log("custom");
        if (darkMode) {
            setDarkMode();
        } else {
            setLightMode();
            console.log("light mode");
        }
    }
    updateTabThemeColor();
}

function setDarkMode() {
    window.logoUrl = "resource/jack_logo_blue.png";
    window.logoSelectedUrl = "resource/jack_logo_black.png";
    document.getElementById("brand-logo").src = logoUrl;
    document.querySelector(":root").classList.add("dark-mode");
    console.log(document.querySelector(":root").classList);
}

function setLightMode() {
    window.logoUrl = "resource/jack_logo_black.png";
    window.logoSelectedUrl = "resource/jack_logo_light.png";
    document.getElementById("brand-logo").src = logoUrl;
    document.querySelector(":root").classList.remove("dark-mode");
    console.log(document.querySelector(":root").classList);
}

// only has effect on Safari. Used for updating tab theme color.
function updateTabThemeColor() {
    const root = document.querySelector(":root");
    const themeColor = getComputedStyle(root).getPropertyValue("--header-bg");
    document.querySelector("[name='theme-color']").setAttribute("content", `${themeColor}`);
    console.log(`themeColor: ${themeColor}, darkMode: ${darkMode}, useSystemScheme: ${useSystemScheme}`);
}


function insertHtml(selector, html) {
    document.querySelector(selector).innerHTML = html;
}

/**
 * Insert a script element as the last child of <body></body> element.
 * Specify the JavaScript cource code using the "src" attribute.
 * The order in which the script elements are inserted matters.
 * @param {string} sourceUrl
 */
function insertScript(sourceUrl) {
    const script = document.createElement("script");
    script.setAttribute("src", sourceUrl);
    document.body.appendChild(script);
}

function loadPage(pageUrl, targetSelector, jsUrls) {
    $ajaxUtils.sendGetRequest(pageUrl,
        function (html) {
            insertHtml(targetSelector, html);
            console.log(jsUrls);
            for (let i = 0; i < jsUrls.length; i++) {
                insertScript(jsUrls[i]);
            }
        },
        false);
}
