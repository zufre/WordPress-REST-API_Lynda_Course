/**
 * AJAX script to load previous post.
 */

(function($){
    // Variables from WordPress
    var post_id = postdata.post_id;
    var theme_uri = postdata.theme_uri;
    var rest_url = postdata.rest_url;

    // When JavaScript is enabled, change the link to a JS trigger.
    $('.load-previous a').attr( 'href', 'javascript:void(0)');

    function previous_post_trigger() {
        // When the trigger is activated, do all the things.
        $('.load-previous a').on( 'click', get_previous_post );
    }
    // Run the above trigger monitor on the current DOM.
    previous_post_trigger();

    // The function in which all the magic happens.
    function get_previous_post() {
        // Get the previous post ID from the clicked trigger above.
        var previous_post_ID = $(this).attr('data-id');
        // Build the resource request URL for the REST API.
        var json_url = rest_url + 'posts/' + previous_post_ID;

        // Run AJAX on the resource request URL
        $.ajax({
            dataType: 'json',
            url: json_url,
        })
        // If AJAX succeeds:
        .done(function(object) {
            console.log(object);
        })
        // If AJAX fails:
        .fail(function(){
            console.log('error');
        })
        // When everything is done:
        .always(function(){
            console.log('AJAX complete');
        });

    }

})(jQuery);
