<?php
/**
 * Add fields to the REST API response
 */

function tschild_get_previous_post_ID() {
    return get_previous_post()->ID;
}

function tschild_get_previous_post_title() {
    return get_previous_post()->post_title;
}

function tschild_get_previous_post_link() {
    return get_permalink( get_previous_post()->ID );
}
