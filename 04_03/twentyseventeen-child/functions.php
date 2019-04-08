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
