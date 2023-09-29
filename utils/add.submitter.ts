import type { Form, FormSubmiter } from "@wgr-sa/nuxt-form"

const { query } = useApi();
const baseUrl = useRuntimeConfig().public.apiUrl

export class AddFormSubmitter implements FormSubmiter {

    public form: Form

    constructor(form: Form) {
        this.form = form
    }

    public async submit() {
        console.log(this.form.action);
        
        const { data, error } = await query(baseUrl + this.form.action, {
            method: 'POST',
            body: this.form.data.state,
            watch: false,
            onResponseError: () => {
                this.form.mutateState('error', 'unknown')
            },
        })

        return { data, error }
    }
}