$(document).ready(function() {

    let toggleRecentFeedback = () => $(".events_list.recent_feedback").find('.right-side-list.events').toggle();

    // hide by default
    toggleRecentFeedback();

    $(".events_list.recent_feedback").find('h2')
        .html('<div id="RecentFeedback" class="Button button-sidebar-wide">Recent Feedback</div>');

    $("#RecentFeedback").on("click", toggleRecentFeedback);

    let cardBtns = Array.from(document.querySelectorAll('.Button.Button--icon-action-rev.ic-DashboardCard__header-button'));

    cardBtns.forEach(btn => btn.addEventListener("click", () => {

        setTimeout(function() {
            document.querySelector('.DashboardCardMenu').parentNode.style.height = "320px";

            let opacityDiv = document.createElement("div");
            opacityDiv.classList.add('ColorPicker__ColorContainer');
            opacityDiv.innerHTML = '<strong>Opacity</strong><div id="slider-val">0.6</div> \
            <input id="opacity-slider" type="range" min="0" max="1" step="0.1" value="0.6">';

            let colorPickerContainer = document.querySelector('.ColorPicker__ColorContainer').parentNode;
            // place above .ColorPicker__ColorContainer
            colorPickerContainer.insertBefore(opacityDiv, colorPickerContainer.childNodes[1]);

            let slider = document.getElementById('opacity-slider');
            let sliderval = document.getElementById('slider-val');

            slider.onchange = function() {
                sliderval.innerHTML = this.value;
                // update opacity of parent DashboardCard__header_hero
                let headerHero = btn.closest(".ic-DashboardCard__header").querySelector('.ic-DashboardCard__header_hero');
                headerHero.style.opacity = this.value;

                // TODO place value into localStorage
            }

        }, 200);

    }));

});