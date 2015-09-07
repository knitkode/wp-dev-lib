<?php

/**
 * Tiny_Php
 *
 * Adapted, variable replacement deleted, only strip whitespaces and comments
 * @see  https://github.com/mattgaidica/TinyPHP
 * About tokens @link(http://php.net/manual/en/tokens.php, php docs).
 * For another solution see
 * @link(http://php.net/manual/it/function.php-strip-whitespace.php#82437, source)
 */
class Tiny_Php {

	/**
	 * Is label
	 * @param  string  $str
	 * @return boolean
	 */
	private function is_label( $str ) {
		return preg_match( '~[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*+~', $str );
	}

	/**
	 * Get tiny
	 * @param  string  $snippet
	 * @param  boolean $remove_whitespace
	 * @param  boolean $remove_comments
	 * @return string
	 */
	public function get_tiny( $snippet, $remove_whitespace = false, $remove_comments = false ) {

		// generate tokens from snippet
		$tokens = token_get_all( $snippet );

		// remove whitespace
		$new_source = '';
		foreach ( $tokens as $i => $token ) {
			if ( ! is_array( $token ) ) {
				$new_source .= $token;
				continue;
			}
			if ( $token[0] == T_WHITESPACE && $remove_whitespace ) {
				if (
					isset( $tokens[ $i - 1 ] ) && isset( $tokens[ $i + 1 ] ) &&
					is_array( $tokens[ $i-1 ] ) && is_array( $tokens[ $i + 1 ] ) &&
					$this->is_label( $tokens[ $i - 1 ][1] ) && $this->is_label( $tokens[ $i + 1 ][1] )
				) {
					$new_source .= ' ';
				}
			} elseif ( $token[0] == T_CASE ) {
				$new_source .= $token[1] . ' ';
			} else {
				$new_source .= $token[1];
			}
		}

		// get all tokens from previous iteration
		$tokens = token_get_all( $new_source );

		// remove comments
		$new_source = '';
		foreach ( $tokens as $token ) {
			if ( ! is_array( $token ) ) {
				$new_source .= $token;
				continue;
			}
			if ( $remove_comments ) {
				if ( in_array( $token[0], array( T_COMMENT ) ) ) {
					continue;
				}
			}
			if ( in_array( $token[0], array( T_DOC_COMMENT ) ) ) {
				$new_source .= "\r\n" .$token[1] . "\r\n";
				continue;
			}
			$new_source .= $token[1];
		}

		return $new_source;
	}
}

/**
 * Run Tiny_Php
 *
 * run it from command line with:
 *
 * ```bash
 * $ php ./dev-lib/minifyphp.php ../plus-bootstrap/build/framework/options*.php
 * ```
 */
$file_glob_path = isset( $argv[1] ) ? $argv[1] : '../plus-bootstrap/build/framework/options*.php';

foreach ( glob( $file_glob_path ) as $filename ) {
	$file_content = file_get_contents( $filename );

	$tinyphp = new Tiny_Php;

	$file_minified_content = $tinyphp->get_tiny( $file_content, true, true );

	// overwrite files
	file_put_contents( $filename, $file_minified_content );
}
