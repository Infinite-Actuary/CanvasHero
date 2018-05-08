$(document).ready(function() {
    let ls = window.top.localStorage;
    let toggleRecentFeedback = () => $(".events_list.recent_feedback").find('.right-side-list.events').toggle();

    // hide recent feedback by default
    toggleRecentFeedback();

    $(".events_list.recent_feedback").find('h2')
        .html('<div id="RecentFeedback" class="Button button-sidebar-wide">Recent Feedback</div>');

    $("#RecentFeedback").on("click", toggleRecentFeedback);

    // load in saved opacity values
    let cardHeaders = Array.from(document.querySelectorAll('.ic-DashboardCard__header-subtitle'));

    cardHeaders.forEach(cardHeader => {
        let opacity = ls.getItem(`${cardHeader.title}-opacity`);
        if (opacity) {
            let headerHero = cardHeader.closest(".ic-DashboardCard__header").querySelector('.ic-DashboardCard__header_hero');
            headerHero.style.opacity = opacity;
        }
    });


    // TODO associate and save each image to the proper card container
    
    // load in background images
    let headers = Array.from(document.getElementById('DashboardCard_Container')
        .querySelectorAll('.ic-DashboardCard__header'));

    let backgrounds = [
        "https://preview.ibb.co/hRCJR7/link_hyrule_castle.jpg",
        "https://preview.ibb.co/e6MZzS/link_molduga.jpg",
        "https://preview.ibb.co/iaTsm7/majoras_mask.jpg",
        "https://preview.ibb.co/cCAitn/zelda_characters.jpg"
        ];

    headers.forEach(header => {
        let image = header.querySelector("div.ic-DashboardCard__header_image");

        if (image) {
            // update background image
            image.style.backgroundImage = `url(${backgrounds.pop()})`;
        } else {
            // add header_image
            let hero = header.querySelector("div.ic-DashboardCard__header_hero");
            let heroWrapper = document.createElement('div');
            heroWrapper.className = "ic-DashboardCard__header_image";
            heroWrapper.style.backgroundImage = `url(${backgrounds.pop()})`;
            header.replaceChild(heroWrapper, hero);
            heroWrapper.appendChild(hero);
        }

    });


    let cardBtns = Array.from(document.querySelectorAll('.Button.Button--icon-action-rev.ic-DashboardCard__header-button'));

    // modify dashboard card options to display opacity slider
    cardBtns.forEach(btn => btn.addEventListener("click", () => {

        setTimeout(function() {
            document.querySelector('.DashboardCardMenu').parentNode.style.height = "320px";

            let opacityKey = btn.closest(".ic-DashboardCard__header").querySelector(".ic-DashboardCard__header-subtitle").title;
            let opacity = ls.getItem(`${opacityKey}-opacity`) || 0.6;

            let opacityDiv = document.createElement("div");
            opacityDiv.classList.add('ColorPicker__ColorContainer');
            opacityDiv.innerHTML = `<strong>Opacity</strong><div id="slider-val">${opacity}</div> \
            <input id="opacity-slider" type="range" min="0" max="1" step="0.1" value="${opacity}">`;

            let colorPickerContainer = document.querySelector('.ColorPicker__ColorContainer').parentNode;

            // place opacity slider above .ColorPicker__ColorContainer
            colorPickerContainer.insertBefore(opacityDiv, colorPickerContainer.childNodes[1]);

            let slider = document.getElementById('opacity-slider');
            let sliderval = document.getElementById('slider-val');

            slider.onchange = function() {
                sliderval.innerHTML = this.value;

                // update opacity of parent DashboardCard__header_hero
                let headerHero = btn.closest(".ic-DashboardCard__header").querySelector('.ic-DashboardCard__header_hero');
                headerHero.style.opacity = this.value;

                // use course subtitle as storage key
                ls.setItem(`${opacityKey}-opacity`, this.value);
            }

        }, 200);

    }));

});