import type { Form, FormSubmiter } from "@wgr-sa/nuxt-form"

const { query } = useApi();
const auth = useRuntimeConfig().public.auth

export class AuthFormSubmitter implements FormSubmiter {

    public form: Form

    constructor(form: Form) {
        this.form = form
    }

    public async submit() {
        const { data, error } = await query(auth.endpoints.signIn.url, {
            method: auth.endpoints.signIn.method,
            body: this.form.data.state,
            watch: false,
            onResponseError: () => {
                this.form.mutateState('error', 'unknown')
            },
        })

        if (error.value) return;

        const { set } = useAuthStorage()
        const { loginRedirect } = useAuthRedirect()

        // id
        const iKey = auth.endpoints.signIn.identityKey
        console.log('iKey', iKey);
        console.log('data', data);

        // @ts-ignore
        const identity = iKey ? data.value[iKey] : data.value
        set('identity', JSON.stringify(identity))

        console.log('identity', identity);


        // tk
        const tKey = auth.endpoints.signIn.tokenKey
        // @ts-ignore
        const token = tKey ? data.value[tKey] : data.value
        set('token', token)

        navigateTo(loginRedirect(identity.role))
    }
}