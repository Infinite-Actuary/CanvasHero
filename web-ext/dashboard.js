//    ___                                                     _ 
//   / __\__ _ _ ____   ____ _ ___    /\  /\___ _ __ ___     / \
//  / /  / _` | '_ \ \ / / _` / __|  / /_/ / _ \ '__/ _ \   /  /
// / /__| (_| | | | \ V / (_| \__ \ / __  /  __/ | | (_) | /\_/ 
// \____/\__,_|_| |_|\_/ \__,_|___/ \/ /_/ \___|_|  \___/  \/   
                                                             
let ls = window.top.localStorage;
let toggleRecentFeedback = () => $(".events_list.recent_feedback").find(".right-side-list.events").toggle();

let setBackgroundImage = (header, imageUrl) => {
    let headerImage = header.querySelector(".ic-DashboardCard__header_image");
    let headerHero = header.querySelector(".ic-DashboardCard__header_hero");

    // cards without a pre-existing background image have a different html structure
    if (headerImage) {
        headerImage.style.backgroundImage = `url(${imageUrl})`;
    } else {
        let imageWrapper = document.createElement("div");
        imageWrapper.className = "ic-DashboardCard__header_image";
        imageWrapper.style.backgroundImage = `url(${imageUrl})`;
        header.replaceChild(imageWrapper, headerHero);
        imageWrapper.appendChild(headerHero);
    }
}

let updateOpacity = (header, opacity) => {
    let headerHero = header.querySelector(".ic-DashboardCard__header_hero");
    headerHero.style.opacity = opacity;
}

// load in previously saved configuration
let keys = Array.from($(".ic-DashboardCard__header-subtitle"));

keys.forEach(key => {
    let header = key.closest(".ic-DashboardCard__header");

    // load in background image URLs
    let imageUrl = ls.getItem(`${key.title}-imageUrl`);
    if (imageUrl) {
        setBackgroundImage(header, imageUrl);
    }

    // load in opacity values
    let opacity = ls.getItem(`${key.title}-opacity`);
    if (opacity) {
        updateOpacity(header, opacity);
    }
});

// hide recent feedback by default
toggleRecentFeedback();

$(".events_list.recent_feedback").find("h2")
    .html('<div id="RecentFeedback" class="Button button-sidebar-wide">Recent Feedback</div>');

$("#RecentFeedback").on("click", toggleRecentFeedback);

// modify dashboard card options-modal to display opacity slider and background image input
let cardBtns = Array.from(document.querySelectorAll(".Button.Button--icon-action-rev.ic-DashboardCard__header-button"));

cardBtns.forEach(btn => btn.addEventListener("click", () => {
    let header = btn.closest(".ic-DashboardCard__header");

    // use course subtitle as storage key
    let key = header.querySelector(".ic-DashboardCard__header-subtitle").title;
    let opacity = ls.getItem(`${key}-opacity`) || 0.6;
    let imageUrl = ls.getItem(`${key}-imageUrl`) || "";

    let options = document.createElement("div");
    options.classList.add("ColorPicker__ColorContainer");
    $(options).html(
        `<strong>Opacity</strong> \
         <div id="slider-val">${opacity}</div> \
         <input id="opacity-slider" type="range" min="0" max="1" step="0.1" value="${opacity}"> \
         <strong>Background</strong> \
         <input id="background-url" type="text" size="15" placeholder="Enter Image URL" value="${imageUrl}">`);

    setTimeout(function() {
        document.querySelector(".DashboardCardMenu").parentNode.style.height = "400px";

        let colorPickerContainer = document.querySelector(".ColorPicker__ColorContainer").parentNode;

        // place options above the color picker container
        colorPickerContainer.insertBefore(options, colorPickerContainer.childNodes[1]);

        let backgroundUrl = document.getElementById("background-url");
        let applyBtn = document.getElementById("ColorPicker__Apply");
        applyBtn.addEventListener("click", () => {
            setBackgroundImage(header, backgroundUrl.value);

            // save background imageUrl to localStorage
            ls.setItem(`${key}-imageUrl`, backgroundUrl.value);
        });

        let slider = document.getElementById("opacity-slider");
        let sliderval = document.getElementById("slider-val");
        slider.onchange = function() {
            let opacity = this.value;
            $(sliderval).html(opacity);

            // update opacity of dashboard card
            updateOpacity(header, opacity);
            // save opacity value to localStorage
            ls.setItem(`${key}-opacity`, opacity);
        }

    }, 200);

}));