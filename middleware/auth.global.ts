export default defineNuxtRouteMiddleware(async (to, from) => {
    // if request is an api request, skip this middleware
    if  (to.path?.startsWith("/api")) return;

    // read cookie from request
    const auth = useCookie("Authorization").value;
    const auth_key = useCookie("Authorization-key").value;
    // if cookie is not set redirect to login page
    if (!auth || !auth_key) {
        if (to.path !== "/auth") {
            return navigateTo("/auth", {
                redirectCode: 401,
            });
        }
    }

});