<script setup lang="ts">
import { watchEffect } from 'vue'
const auth = useRuntimeConfig().public.auth
const { post } = useApi()

console.log(useRuntimeConfig())

const formMessage = { submit: 'Connexion', alert: {
  submitted: 'Connexion réussie',
  error: 'Nope...'
} }
const login = ref()

// LOGIN PROCESS
watchEffect(async () => {
  if(login.value?.ready()) {  

const {data, error} = await login.value.actions.submit()
if(error.value) return;

const {set} = useAuthStorage()
const {loginRedirect} = useAuthRedirect()
const identity = data.value.data
const token = data.value.token

set('token', token)
set('identity', JSON.stringify(identity))
navigateTo(loginRedirect(identity.role))
}
})

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
    <FormSubmit>
      Login
    </FormSubmit>
  </FormBuilder>
</template>