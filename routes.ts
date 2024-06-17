/**
 * An array of routes that are accessible to the public
 * These route do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[]=[
    "/",
    '/auth/new-verification'
]
/**
 * An array of routes that are used for authentication
 * These route will redirect logged in users to /settings
 * @type {string[]}
 */
export const authenticationRoutes: string[]=[
    "/auth/login",
    "/auth/register",
    '/auth/error'
]

/**
 * The Prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purpose
 * @type {string}
 */
export const apiAuthPrefix: string= "/api/auth"

/**
 * The default redirect path after logged in
 * @type {string}
 */
export const DEFAULT_LOGIN_DEIRECT: string= '/setting'
