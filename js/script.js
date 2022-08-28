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

    // handle hover effect on logo
    document.getElementById("brand-logo").addEventListener("mouseover",
        function (event) {
            this.src = logoSelectedUrl;
        }
    );

    // restore hover effect on logo
    document.getElementById("brand-logo").addEventListener("mouseleave",
        function (event) {
            this.src = logoUrl;
        }
    );

    // clicking on navigation button changes page content
    document.getElementById("contact").addEventListener("click", function (event) {
        // TODO: make HTTPRequest to load the contact page snippet.
        document.querySelector(".home-content").innerHTML =
            "<h2> You can reach me at <a href='mailto: jackyu0815@gmail.com'>jackyu0815@gmail.com</a></h2>" +
            "<h3>I value your feedback and suggestion.</h3>"
        let prevActiveElement = document.querySelector(".active.nav-link");
        let prevActiveClassString = prevActiveElement.className;
        prevActiveClassString = prevActiveClassString.replace(new RegExp("active", "g"), "");
        prevActiveElement.className = prevActiveClassString;
        prevActiveElement.removeAttribute("aria-current");
        this.className += " active";
        this.setAttribute("aria-current", "page");
    })

    // change color scheme when user changed color scheme preference
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", updateColorScheme);
});


/**
 * load the correct color scheme for the device's OS.
 * @param {Event} event - the event object
 */
function updateColorScheme(event) {
    if (matchMedia("(prefers-color-scheme: dark)").matches) {
        window.logoUrl = "resource/jack_logo_blue.png";
        window.logoSelectedUrl = "resource/jack_logo_black.png";
        document.getElementById("brand-logo").src = logoUrl;
        console.log("dark mode");
    } else {
        window.logoUrl = "resource/jack_logo_black.png";
        window.logoSelectedUrl = "resource/jack_logo_light.png";
        document.getElementById("brand-logo").src = logoUrl;
        console.log("light mode");
    }
}