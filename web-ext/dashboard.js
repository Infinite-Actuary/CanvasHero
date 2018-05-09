// about:debugging
$(document).ready(function() {
    let ls = window.top.localStorage;
    let toggleRecentFeedback = () => $(".events_list.recent_feedback").find('.right-side-list.events').toggle();

    // hide recent feedback by default
    toggleRecentFeedback();

    $(".events_list.recent_feedback").find('h2')
        .html('<div id="RecentFeedback" class="Button button-sidebar-wide">Recent Feedback</div>');

    $("#RecentFeedback").on("click", toggleRecentFeedback);

    // load in localStorage settings
    let headerSubtitles = Array.from(document.querySelectorAll('.ic-DashboardCard__header-subtitle'));

    headerSubtitles.forEach(headerSubtitle => {
        let header = headerSubtitle.closest(".ic-DashboardCard__header");
        let headerImage = header.querySelector('.ic-DashboardCard__header_image');
        let headerHero = header.querySelector('.ic-DashboardCard__header_hero');

        // load in opacity values
        let opacity = ls.getItem(`${headerSubtitle.title}-opacity`);
        if (opacity) {
            headerHero.style.opacity = opacity;
        }

        // load in background image URLs
        let imageUrl = ls.getItem(`${headerSubtitle.title}-imageUrl`);
        if (imageUrl) {
            if (headerImage) {
                headerImage.style.backgroundImage = `url(${imageUrl})`;
            } else {
                console.log(imageUrl);
                let imageWrapper = document.createElement('div');
                imageWrapper.className = "ic-DashboardCard__header_image";
                imageWrapper.style.backgroundImage = `url(${imageUrl})`;
                header.replaceChild(imageWrapper, headerHero);
                imageWrapper.appendChild(headerHero);
            }
        }
    });

    let cardBtns = Array.from(document.querySelectorAll('.Button.Button--icon-action-rev.ic-DashboardCard__header-button'));

    // modify dashboard card options to display opacity slider
    cardBtns.forEach(btn => btn.addEventListener("click", () => {

        setTimeout(function() {
            document.querySelector('.DashboardCardMenu').parentNode.style.height = "400px";

            let header = btn.closest(".ic-DashboardCard__header");
            let headerImage = header.querySelector('.ic-DashboardCard__header_image');
            let headerHero = header.querySelector('.ic-DashboardCard__header_hero');
            let key = header.querySelector(".ic-DashboardCard__header-subtitle").title;
            let opacity = ls.getItem(`${key}-opacity`) || 0.6;
            let imageUrl = ls.getItem(`${key}-imageUrl`) || "";

            let opacityDiv = document.createElement("div");
            opacityDiv.classList.add('ColorPicker__ColorContainer');
            opacityDiv.innerHTML = `<strong>Opacity</strong><div id="slider-val">${opacity}</div> \
            <input id="opacity-slider" type="range" min="0" max="1" step="0.1" value="${opacity}">`;

            let colorPickerContainer = document.querySelector('.ColorPicker__ColorContainer').parentNode;

            // place opacity slider above .ColorPicker__ColorContainer
            colorPickerContainer.insertBefore(opacityDiv, colorPickerContainer.childNodes[1]);

            let slider = document.getElementById('opacity-slider');
            let sliderval = document.getElementById('slider-val');

            // create background image div
            let backgroundDiv = document.createElement("div");
            backgroundDiv.classList.add('ColorPicker__ColorContainer');
            backgroundDiv.innerHTML = `<strong>Background</strong> \
            <input id="background-url" type="text" size="15" placeholder="Enter Image URL" value="${imageUrl}">`;

            // place background input
            colorPickerContainer.insertBefore(backgroundDiv, colorPickerContainer.childNodes[1]);
            let backgroundURL = document.getElementById('background-url');

            let applyBtn = document.getElementById("ColorPicker__Apply");
            applyBtn.addEventListener("click", () => {
                // cards without an image have a different html structure
                if (headerImage) {
                    console.log("headerImage exists");
                    headerImage.style.backgroundImage = `url(${backgroundURL.value})`;
                } else {
                    console.log("no header image");
                    let imageWrapper = document.createElement('div');
                    imageWrapper.className = "ic-DashboardCard__header_image";
                    imageWrapper.style.backgroundImage = `url(${backgroundURL.value})`;
                    header.replaceChild(imageWrapper, headerHero);
                    imageWrapper.appendChild(headerHero);
                }

                // save background image-url to localStorage
                ls.setItem(`${key}-imageUrl`, backgroundURL.value);
            });

            slider.onchange = function() {
                sliderval.innerHTML = this.value;

                // update opacity of parent DashboardCard__header_hero
                headerHero.style.opacity = this.value;

                // use course subtitle as storage key
                ls.setItem(`${key}-opacity`, this.value);
            }

        }, 200);

    }));

});