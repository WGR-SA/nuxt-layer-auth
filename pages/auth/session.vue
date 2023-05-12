<script setup lang="ts">
// CONST
const auth = useRuntimeConfig().public.auth
const { get } = useApi()

const { data, error } = await get(auth.endpoints.getSession.url)

console.log(error);


if(error.value) navigateTo(auth.endpoints.signIn.path)
else
{
  const {set} = useAuthStorage()
  const {loginRedirect} = useAuthRedirect()
  const identity = data.value.data

  set('identity', JSON.stringify(identity))
  navigateTo(loginRedirect(identity.role))
}



</script>
<template>
  <h1>Session</h1>
</template>