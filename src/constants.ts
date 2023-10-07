/**
 * For example, search query for WebAPP started from inline mode has `?inline` query
 */
export const IS_INLINE_MODE = window.location.search.indexOf('inline') !== -1;

/**
 * Normally public path doesn't change, but we are hosting our files in Github Pages, there basePath can changed
 */
export const PUBLIC_PATH = process.env.PUBLIC_PATH || '';

export const TELEGRAM_BOT_NAME = process.env.TELEGRAM_BOT_NAME || '';
