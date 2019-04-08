/**
 * WP Reader accepts a user-defined URL and tries to obtain
 * the 10 latest posts at the URL location through the WP REST API.
 *
 * NOT FOR PRODUCTION. PURELY FOR DEMONSTRATION PURPOSES!
 */

jQuery( document ).ready(function($){

    // Create global rest_url variable.
    var rest_url;

    // Get user specified URL from form.
    $('#new-url').submit(function(e) {
        // Don't reload page.
        e.preventDefault();
        // Get the URL from the form.
        var raw_url = $('input[name=raw_url]').val();

        // Check if the string entered in the form is a porper URL.
        try {
            $('.error').remove();
            var clean_url = (new URL(raw_url)).protocol + '//' + (new URL(raw_url)).hostname;
            rest_url = clean_url + '/wp-json/wp/v2/';
            // Get the posts from the new URL.
            console.log(rest_url);
            get_post_list();
        }
        // Otherwise, throw an error message.
        catch (e) {
            $('.site-header').append('<div class="error">That didn&rsquo;t work. Try a different URL.</div>');
            console.log('ERROR: User input is not a proper URL.');
        }
    });

    function get_post_list() {

        $('.nav-loader').toggle();
        var json_url = rest_url + 'posts/';

        $.ajax({
            dataType: 'json',
            url: json_url
        })

        .done(function(object){
            create_post_list(object);
        })

        .fail(function() {
            $('.site-header').append('<div class="error">That didn&rsquo;t work. Try a different URL.</div>');
            console.log('ERROR: REST error. Nothing returned for AJAX.');
        })

        .always(function() {
            $('.nav-loader').remove();
        })
    }

    function create_post_list(object) {
        $('.navigation-list').empty().append('<ul></ul>');
        var nav_list_item;

        for(var i=0; i<object.length; i++) {
            nav_list_item =
                '<li>' +
                '<a href="javascript:void(0)" data-id="' + object[i].id + '">' +
                object[i].title.rendered +
                '</a>' +
                '</li>';
            $('.navigation-list ul').append(nav_list_item);
        }
    }

});
