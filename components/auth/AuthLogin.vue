<script setup lang="ts">
import { watchEffect } from 'vue'
import { AuthFormSubmitter } from '../../utils/auth.submitter';
const auth = useRuntimeConfig().public.auth
const { formReady } = useFormBuilder()

console.log(useRuntimeConfig())

const formMessage = { submit: 'Connexion', alert: {
  submitted: 'Connexion réussie',
  error: 'Nope...'
} }
const login = ref()
</script>
<template>
  <FormBuilder
    ref="login"
    :submitter="AuthFormSubmitter"
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