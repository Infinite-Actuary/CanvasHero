$(document).ready(function() {

    let toggleRecentFeedback = () => $(".events_list.recent_feedback").find('.right-side-list.events').toggle();

    // hide by default
    toggleRecentFeedback();

    $(".events_list.recent_feedback").find('h2')
        .html('<div id="RecentFeedback" class="Button button-sidebar-wide">Recent Feedback</div>');

    $("#RecentFeedback").on("click", toggleRecentFeedback);

});