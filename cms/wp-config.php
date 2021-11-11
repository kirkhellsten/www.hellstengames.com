<?php
define( 'WP_CACHE', true );
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u590449166_Hzi4M' );

/** MySQL database username */
define( 'DB_USER', 'u590449166_m4L40' );

/** MySQL database password */
define( 'DB_PASSWORD', '1V2TgZEPgP' );

/** MySQL hostname */
define( 'DB_HOST', 'mysql' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'zbt0_d|hsE_mSA@orTPW5pXA#+S|Cl2d6-Lj?xrj]I`/q7Jq=^zcD6)Zk!wa2oOk' );
define( 'SECURE_AUTH_KEY',   'tQ%g(X0`g5WuHYgUuS)at})-Hk/=HINB[`,H6jG(hG[MVzp)!X^95kDKB1S%lfMx' );
define( 'LOGGED_IN_KEY',     'M#3u%hQ*wXQX^_gFe$)!Xj|3K+|g^2;Z$d9u-D},u%R:wJv}&{~.@Lr{?n$)MA4,' );
define( 'NONCE_KEY',         '{UsMK3$KT(CitCm,;,sLBx?QdeSi?zu<_3OKG]u+NK<(2#6MAMFvpLVlrY:}P3I#' );
define( 'AUTH_SALT',         ' Fsf[Xur3%{y,[9,6F?~;&x8)c1y?Rhpi1O4+Tr|K/zhKFU88&o/!K0G_?}uG~.]' );
define( 'SECURE_AUTH_SALT',  'FXG2es)7GZS],z6q|n`!Q:5NW$gQp;36.:[W&e^WNV#`!7;>g7`5V3GA`Z`BrZO9' );
define( 'LOGGED_IN_SALT',    'LU}!LM0%X(4gr4LdR~ujSA63@:<DvK=hd|)Bz~ND.I.NlKwhr,Fx4bX<+<dXX(#a' );
define( 'NONCE_SALT',        ')_PxvFyJteGX5W-r10a|N[*wi</NFe:NM T3XpKlzc,cGW~}h6.CrfTP,R|6:gCf' );
define( 'WP_CACHE_KEY_SALT', '{UYD%mB|yGQB25}51FDL9wH$j ki/gx$Y&[?oXxEHO+WJdM$?;nZvZyqaSX76kDf' );

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




define( 'WP_AUTO_UPDATE_CORE', true );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
