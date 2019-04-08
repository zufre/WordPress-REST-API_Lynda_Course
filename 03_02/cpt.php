<?php
/*
Plugin Name: Morten's Custom Post Types and Taxonomies
Description: Adds custom post types and taxonomies
Version:     1.0.0
Author:      Morten Rand-Hendriksen
Author URI:  https://lynda.com/mor10
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: mcptt-cpt
*/

/**
 * Register a lectures post type.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_post_type
 */
function mcpttcpt_lectures_init() {
	$labels = array(
		'name'               => _x( 'Lectures', 'post type general name', 'mcptt-cpt' ),
		'singular_name'      => _x( 'Lecture', 'post type singular name', 'mcptt-cpt' ),
		'menu_name'          => _x( 'Lectures', 'admin menu', 'mcptt-cpt' ),
		'name_admin_bar'     => _x( 'Lecture', 'add new on admin bar', 'mcptt-cpt' ),
		'add_new'            => _x( 'Add New', 'lecture', 'mcptt-cpt' ),
		'add_new_item'       => __( 'Add New Lecture', 'mcptt-cpt' ),
		'new_item'           => __( 'New Lecture', 'mcptt-cpt' ),
		'edit_item'          => __( 'Edit Lecture', 'mcptt-cpt' ),
		'view_item'          => __( 'View Lecture', 'mcptt-cpt' ),
		'all_items'          => __( 'All Lectures', 'mcptt-cpt' ),
		'search_items'       => __( 'Search Lectures', 'mcptt-cpt' ),
		'parent_item_colon'  => __( 'Parent Lectures:', 'mcptt-cpt' ),
		'not_found'          => __( 'No lectures found.', 'mcptt-cpt' ),
		'not_found_in_trash' => __( 'No lectures found in Trash.', 'mcptt-cpt' )
	);

	$args = array(
		'labels'             => $labels,
        'description'        => __( 'Post type for lecture notes and information.', 'mcptt-cpt' ),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'lecture' ),
		'capability_type'    => 'post',
        'show_in_rest'       => true,
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
        'taxonomies'         => array('category', 'post_tag' )
	);

	register_post_type( 'lectures', $args );
}
add_action( 'init', 'mcpttcpt_lectures_init' );

/**
 * Lecture update messages.
 *
 * See /wp-admin/edit-form-advanced.php
 *
 * @param array $messages Existing post update messages.
 *
 * @return array Amended post update messages with new CPT update messages.
 */
function mcpttcpt_lecture_updated_messages( $messages ) {
	$post             = get_post();
	$post_type        = get_post_type( $post );
	$post_type_object = get_post_type_object( $post_type );

	$messages['lecture'] = array(
		0  => '', // Unused. Messages start at index 1.
		1  => __( 'Lecture updated.', 'mcptt-cpt' ),
		2  => __( 'Custom field updated.', 'mcptt-cpt' ),
		3  => __( 'Custom field deleted.', 'mcptt-cpt' ),
		4  => __( 'Lecture updated.', 'mcptt-cpt' ),
		/* translators: %s: date and time of the revision */
		5  => isset( $_GET['revision'] ) ? sprintf( __( 'Lecture restored to revision from %s', 'mcptt-cpt' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		6  => __( 'Lecture published.', 'mcptt-cpt' ),
		7  => __( 'Lecture saved.', 'mcptt-cpt' ),
		8  => __( 'Lecture submitted.', 'mcptt-cpt' ),
		9  => sprintf(
			__( 'Lecture scheduled for: <strong>%1$s</strong>.', 'mcptt-cpt' ),
			// translators: Publish box date format, see http://php.net/date
			date_i18n( __( 'M j, Y @ G:i', 'mcptt-cpt' ), strtotime( $post->post_date ) )
		),
		10 => __( 'Lecture draft updated.', 'mcptt-cpt' )
	);

	if ( $post_type_object->publicly_queryable ) {
		$permalink = get_permalink( $post->ID );

		$view_link = sprintf( ' <a href="%s">%s</a>', esc_url( $permalink ), __( 'View lecture', 'mcptt-cpt' ) );
		$messages[ $post_type ][1] .= $view_link;
		$messages[ $post_type ][6] .= $view_link;
		$messages[ $post_type ][9] .= $view_link;

		$preview_permalink = add_query_arg( 'preview', 'true', $permalink );
		$preview_link = sprintf( ' <a target="_blank" href="%s">%s</a>', esc_url( $preview_permalink ), __( 'Preview lecture', 'mcptt-cpt' ) );
		$messages[ $post_type ][8]  .= $preview_link;
		$messages[ $post_type ][10] .= $preview_link;
	}

	return $messages;
}
add_filter( 'post_updated_messages', 'mcpttcpt_lecture_updated_messages' );

// Create two taxonomies, Class and Year, for the post type "Lecture"
function mcpttcpt_lecture_taxonomies() {
	// Add Class taxonomy, make it hierarchical (like categories)
	$labels = array(
		'name'              => _x( 'Classes', 'taxonomy general name' ),
		'singular_name'     => _x( 'Class', 'taxonomy singular name' ),
		'search_items'      => __( 'Search Classes' ),
		'all_items'         => __( 'All Classes' ),
		'parent_item'       => __( 'Parent Class' ),
		'parent_item_colon' => __( 'Parent Class:' ),
		'edit_item'         => __( 'Edit Class' ),
		'update_item'       => __( 'Update Class' ),
		'add_new_item'      => __( 'Add New Class' ),
		'new_item_name'     => __( 'New Class Name' ),
		'menu_name'         => __( 'Classes' ),
	);
	$args = array(
		'hierarchical'      => true,
		'labels'            => $labels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
        'show_in_rest'      => true,
		'rewrite'           => array( 'slug' => 'class' ),
	);
	register_taxonomy( 'class', array( 'lectures' ), $args );
	// Add new Year taxonomy, make it non-hierarchical (like tags)
	$labels = array(
		'name'                       => _x( 'Years', 'taxonomy general name' ),
		'singular_name'              => _x( 'Year', 'taxonomy singular name' ),
		'search_items'               => __( 'Search Years' ),
		'popular_items'              => __( 'Popular Years' ),
		'all_items'                  => __( 'All Years' ),
		'parent_item'                => null,
		'parent_item_colon'          => null,
		'edit_item'                  => __( 'Edit Year' ),
		'update_item'                => __( 'Update Year' ),
		'add_new_item'               => __( 'Add New Year' ),
		'new_item_name'              => __( 'New Year Name' ),
		'separate_items_with_commas' => __( 'Separate years with commas' ),
		'add_or_remove_items'        => __( 'Add or remove years' ),
		'choose_from_most_used'      => __( 'Choose from the most used years' ),
		'not_found'                  => __( 'No years found.' ),
		'menu_name'                  => __( 'Years' ),
	);
	$args = array(
		'hierarchical'          => false,
		'labels'                => $labels,
		'show_ui'               => true,
		'show_admin_column'     => true,
		'update_count_callback' => '_update_post_term_count',
		'query_var'             => true,
        'show_in_rest'          => true,
		'rewrite'               => array( 'slug' => 'year' ),
	);
	register_taxonomy( 'year', 'lectures', $args );
}
add_action( 'init', 'mcpttcpt_lecture_taxonomies', 0 );

/**
 * Flush rewrite rules to make custom ULRs active
 */
function mcpttcpt_rewrite_flush() {
    mcpttcpt_lectures_init(); //
    flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'mcpttcpt_rewrite_flush' );
