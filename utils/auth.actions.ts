import type { FormActions, FormMappedForActions } from "@wgr-sa/nuxt-form"

const { query } = useApi();
const auth = useRuntimeConfig().public.auth

export class AuthFormActions implements FormActions {

  public form: FormMappedForActions

  constructor(form: FormMappedForActions) {
    this.form = form
  }

  public async submit() {
    const { data, error } = await query(auth.endpoints.signIn.url, {
      method: auth.endpoints.signIn.method,
      body: this.form.data.state,
      onResponseError: () => {
        this.form.mutateState('error', 'unknown')
      },
    })

    return { data, error }
  }

  public async create(redirect: string | null = null) {
    return false;
  }

  public async update(redirect: string | null = null) {
    return false;
  }

  public delete() {
    return false
  }

  public read() {
    return false
  }
}