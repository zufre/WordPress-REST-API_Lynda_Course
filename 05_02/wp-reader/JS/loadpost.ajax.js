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
        }
        // Otherwise, throw an error message.
        catch (e) {
            $('.site-header').append('<div class="error">That didn&rsquo;t work. Try a different URL.</div>');
            console.log('ERROR: User input is not a proper URL.');
        }
    });

});
