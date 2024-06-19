import NextAuth from 'next-auth';
const { auth } = NextAuth(authConfig);

import authConfig from './auth.config';
import { publicRoutes, apiAuthPrefix, authenticationRoutes, DEFAULT_LOGIN_DEIRECT } from './routes';

export default auth((req) => {
    //handle route to protect or allow access
    // req.auth
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    /**
     * Check nextUrl is apiAuthRoute, not protected them from NextAuth
     */
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    /**
     * Check nextUrl is publicRoute
     */
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authenticationRoutes.includes(nextUrl.pathname);

    //If the route is apiRoute --> do nothing
    if (isApiAuthRoute) {
        return;
    }
    //If the route is authRoute
    if (isAuthRoute) {
        //If isLoggedIn redirect user to '/setting'
        //Can change DEFAULT_LOGIN_DEIRECT in the future
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_DEIRECT, nextUrl));
        }
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        //get last visited path and redirect it when login
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    }
    return;
});

// Optionally, don't INVOKE Middleware on some paths
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
