/**
 * AJAX script to load previous post.
 */

(function($){

    var post_id = postdata.post_id;
    var theme_uri = postdata.theme_uri;
    var rest_url = postdata.rest_url;

    console.log('post_id: ' + post_id + ' theme_uri: ' + theme_uri + ' rest_url: ' + rest_url);

    $('.load-previous a').attr( 'href', 'javascript:void(0)');

})(jQuery);
