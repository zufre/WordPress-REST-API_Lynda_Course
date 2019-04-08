<?php
/**
 * Add fields to the REST API response
 */

add_action( 'rest_api_init', 'tschild_register_fields' );
function tschild_register_fields() {
    register_rest_field( 'post',
        'previous_post_ID',
        array(
            'get_callback'    => 'tschild_get_previous_post_ID',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'post',
        'previous_post_title',
        array(
            'get_callback'    => 'tschild_get_previous_post_title',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'post',
        'previous_post_link',
        array(
            'get_callback'    => 'tschild_get_previous_post_link',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

function tschild_get_previous_post_ID() {
    return get_previous_post()->ID;
}

function tschild_get_previous_post_title() {
    return get_previous_post()->post_title;
}

function tschild_get_previous_post_link() {
    return get_permalink( get_previous_post()->ID );
}

/**
 * Enqueue JavaScript.
 */

add_action( 'wp_enqueue_scripts', 'tsc_scripts' );
function tsc_scripts() {
    if ( is_single() ){
        wp_enqueue_script( 'tsc-js', get_theme_file_uri('JS/previous.ajax.js'), array('jquery'), '0.1', true );
    }
}
