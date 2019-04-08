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
            build_post(object)
        })
        // If AJAX fails:
        .fail(function(){
            console.log('error');
        })
        // When everything is done:
        .always(function(){
            console.log('AJAX complete');
        });


        function build_post(object) {
            var date = new Date(object.date);
            var previous_post_content =
                '<div class="generated">' +
                '<div class="wrap">' +
                '<div class="content-area">' +
                '<div class="site-main">' +
                '<article class="post hentry" data-id="' + object.id + '">' +
                '<header class="entry-header">' +
                '<div class="entry-meta">' +
                '<span class="posted-on">' +
                '<span class="screen-reader-text">Posted on</span> ' +
                '<a href="' + object.link + '" rel="bookmark">' +
                '<time class="entry-date published" datetime="' + date + '">' + date.toDateString() + '</time>' +
                '</a>' +
                '</span>' +
                '<span class="byline"> by <span class="author vcard">' +
                'Author Name' +
                '</span>' +
                '</span>' +
                '</div><!-- .entry-meta -->' +
                '<h1 class="entry-title">' + object.title.rendered + '</h1>' +
                '</header><!-- .entry-header -->' +
                '<div class="entry-content">' +
                object.content.rendered +
                '</div><!-- .entry-content -->' +
                '</article><!-- #post-## -->' +
                '</div><!-- .site-main -->' +
                '</div><!-- .content-area -->' +
                '</div><!-- .wrap -->' +
                '</div><!-- .generated -->' +
                '<nav class="navigation post-navigation load-previous" role="navigation">' +
                '<span class="nav-subtitle">Previous post</span>' +
                '<div class="nav-links">' +
                '<div class="nav-previous">' +
                '<a href="javascript:void(0)" data-id="' + object.previous_post_ID + '">' +
                object.previous_post_title +
                '</a>' +
                '</nav>';

            // Append related posts to the #related-posts container
            $('.post-navigation').replaceWith(previous_post_content);

            // Reininitialize the previous post trigger on new content.
            previous_post_trigger();
        }
    }

})(jQuery);
