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

        const hasPermission = permissionRoles.includes(role);

        if (!hasPermission) {
            const replacement = document.createElement('div');
            replacement.setAttribute('id', vnode.scopeId);
            replacement.hidden = true;

            el.parentNode && el.parentNode.replaceChild(replacement, el);
        } else {
            if (!el.parentNode && vnode.ctx.$_permissionParentNode) {
                console.log(vnode.ctx.$_permissionParentNode, el)

                const slot = vnode.ctx.$_permissionParentNode.querySelector(`#${vnode.scopeId}`);
                if (slot) {
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