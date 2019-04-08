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
        var trigger = $('.load-previous a');

        var trigger_position = trigger.offset().top + 150 - $(window).outerHeight();

        $(window).scroll(function(event) {
            if (trigger_position > $(window).scrollTop()) {
                return;
            }

            get_previous_post(trigger);

            $(this).off(event);
        })
    }
    // Run the above trigger monitor on the current DOM.
    previous_post_trigger();

    // The function in which all the magic happens.
    function get_previous_post(trigger) {

        // Get the previous post ID from the clicked trigger above.
        var previous_post_ID = trigger.attr('data-id');
        // Build the resource request URL for the REST API.
        var json_url = rest_url + 'posts/' + previous_post_ID + '?_embed=true';

        // Run AJAX on the resource request URL
        $.ajax({
            dataType: 'json',
            url: json_url,
        })
        // If AJAX succeeds:
        .done(function(object) {
            the_previous_post(object)
        })
        // If AJAX fails:
        .fail(function(){
            console.log('error');
        })
        // When everything is done:
        .always(function(){
            console.log('AJAX complete');
        });

    } // END get_previous_post()

    function the_previous_post(object) {

        // Get the featured image ID (0 if no featured image):
        var featured_img_ID = object.featured_media;

        // Create an empty container for theoretical featured image.
        var feat_image;

        // Get the featured image if there is a featured image.
        function get_featured_image() {
            if (featured_img_ID === 0) {
                feat_image = '';
            } else {
                var featured_object = object._embedded['wp:featuredmedia'][0];
                var img_large = '';
                var img_width = featured_object.media_details.sizes.full.width;
                var img_height = featured_object.media_details.sizes.full.height;
                if (featured_object.media_details.sizes.hasOwnProperty("large")) {
                    img_large = featured_object.media_details.sizes.large.source_url +  ' 1024w, ';
                }
                feat_image = '<div class="single-featured-image-header">' +
                             '<img src="' + featured_object.media_details.sizes.full.source_url + '" ' +
                             'width="' + img_width + '" ' +
                             'height="' + img_height + '" ' +
                             'class="attachment-twentyseventeen-featured-image size-twentyseventeen-featured-image wp-post-image" ' +
                             'alt="" ' +
                             'srcset="' + featured_object.media_details.sizes.full.source_url + ' ' + img_width + 'w, ' + img_large + featured_object.media_details.sizes.medium.source_url + ' 300w" ' +
                             'sizes="100vw">' +
                             '</div>';
            }
            return feat_image;
        }

        // Build the post, with or without the featured image.
        function build_post() {
            var date = new Date(object.date);
            var previous_post_content =
                '<div class="generated">' +
                get_featured_image() +
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
                object._embedded.author[0].name +
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

        // Run the menagerie.
        build_post()
    }

})(jQuery);
