export default defineNuxtPlugin(({ vueApp }) => {
    console.info('Test plugin load');

    vueApp.directive('permission', {
        beforeMount(el, binding, vNode) {
            console.info('Test wanting to mount', el, binding, vNode);
        },
        created(el, binding, vNode) {
            const allowed_perms = [0, 3]
            const user_perm = binding.value
            if (!allowed_perms.includes(user_perm)) {
                el.hidden = true
            }
        },
        updated(el, binding, vNode) {
            const allowed_perms = [0, 3]
            const user_perm = binding.value
            if (!allowed_perms.includes(user_perm)) {
                el.hidden = true
            } else
                el.hidden = false
        }
    });
});