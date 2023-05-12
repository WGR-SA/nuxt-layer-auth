<script setup lang="ts">
import { watchEffect } from 'vue'
const auth = useRuntimeConfig().public.auth
const { formReady } = useFormBuilder()

console.log(useRuntimeConfig())

const formMessage = { submit: 'Connexion', alert: {
  submitted: 'Connexion réussie',
  error: 'Nope...'
} }
const login = ref()

// LOGIN PROCESS
const submit = async () => {

  await formReady(login.value)
  if(!login.value?.ready()) return

  console.log('DADA')
  const {data, error} = await login.value.actions.submit()
  if(error.value) return;

  const {set} = useAuthStorage()
  const {loginRedirect} = useAuthRedirect()

  // id
  const iKey = auth.endpoints.signIn.identityKey
  const identity = iKey? data.value[iKey]: data.value
  set('identity', JSON.stringify(identity))

  // tk
  const tKey = auth.endpoints.signIn.tokenKey
  const token = tKey? data.value[tKey]: data.value
  set('token', token)

  navigateTo(loginRedirect(identity.role))
  
}
</script>
<template>
  <FormBuilder
    ref="login"
    :actions="AuthFormActions"
    :messages="formMessage"
  >
    <FormInput
      name="username"
      label="Username"
      :rules="['isNotEmpty']"
    />
    <FormInput
      name="password"
      label="Password"
      :rules="['isNotEmpty']"
      type="password"
    />
    <button @click.prevent="submit()">
      Login
    </button>
  </FormBuilder>
</template>