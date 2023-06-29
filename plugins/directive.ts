export default defineNuxtPlugin(({ vueApp }) => {
    console.info('Test plugin load');

    vueApp.directive('permission', {
        created(el, binding, vnode, oldVnode) {
            Auth(el, binding, vnode, oldVnode);
        },
        updated(el, binding, vnode, oldVnode) {
            Auth(el, binding, vnode, oldVnode);
        },
    });
});

var Auth = (el: any, binding: any, vnode: any, oldVnode: any) => {
    const { value } = binding;
    const role = useCookie('Authorization-role').value;

    if (value && value instanceof Array && value.length > 0) {
        const permissionRoles = value;

        const hasPermission = role == '0' || permissionRoles.includes(role);

        if (!hasPermission) {
            /* create replacement node */
            const replacement = document.createElement('div');
            replacement.setAttribute('id', 'vnode-'+vnode.ctx.uid);
            replacement.hidden = true;

            /* replace element with replacement node */
            el.parentNode && el.parentNode.replaceChild(replacement, el);
        } else {
            if (!el.parentNode && vnode.ctx.$_permissionParentNode) {

                /* replace replacement node with element */
                const slot = vnode.ctx.$_permissionParentNode.querySelector(`#vnode-${vnode.ctx.uid}`);
                if (slot) {
                    /* replace node with element */
                    vnode.ctx.$_permissionParentNode.replaceChild(el, slot);
                } else {
                    vnode.ctx.$_permissionParentNode.appendChild(el);
                    console.log('append to end of parent node')
                }
            } else vnode.ctx.$_permissionParentNode = el.parentNode;
        }
    } else {
        throw new Error(`Need roles! Like v-permission="[0,1,2]"`);
    }
}