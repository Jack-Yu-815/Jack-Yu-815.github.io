document.addEventListener("DOMContentLoaded", function (event) {

    const aTag = document.querySelector("nav a.brand")
    const logoImage = document.getElementById("brand-logo");
    // handle hover effect on brand area (logo + brand text)
    aTag.addEventListener("mouseover",
        function (event) {
            logoImage.src = logoSelectedUrl;
        }
    );

    // restore hover effect on logo
    aTag.addEventListener("mouseleave",
        function (event) {
            logoImage.src = logoUrl;
        }
    );

    // clicking on navigation button changes page content and resets active status
    setUpButton("home", "home.html", ".main-content");
    // setUpButton("my-story", "my_story.html", ".main-content");
    // setUpButton("enjoy", "enjoy.html", ".main-content");
    // setUpButton("my-projects", "my_projects.html", ".main-content");
    setUpButton("contact", "contact.html", ".main-content");
    setUpButton("appearance", "appearance.html", ".main-content", ["js/appearance.js"]);

    /**
     * Insert HTML to page content and reset active status.
     * @param {string} elementId
     * @param {string} pageUrl
     * @param {string} targetSelector
     * @param {Array} jsUrls
     */
    function setUpButton(elementId, pageUrl, targetSelector, jsUrls = []) {
        document.getElementById(elementId).addEventListener("click", function (event) {
            // $ajaxUtils.sendGetRequest(pageUrl,
            //     function (html) {
            //         insertHtml(targetSelector, html);
            //         console.log(jsUrls);
            //         for (let i = 0; i < jsUrls.length; i++) {
            //             insertScript(jsUrls[i]);
            //         }
            //     },
            //     false);
            // reassignActiveClass(this);
            loadPage(pageUrl, targetSelector, jsUrls);
            reassignActiveClass(this);
        });
    }


    function reassignActiveClass(element) {
        let prevActiveElement = document.querySelector(".active.nav-link");
        prevActiveElement.classList.remove("active");
        prevActiveElement.removeAttribute("aria-current"); // aria-current attribute is a disability feature

        element.classList.add("active");
        element.setAttribute("aria-current", "page");
    }
});