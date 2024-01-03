<template>
    <h1>Login</h1>
    <form v-on:submit.prevent="submit()">
        <input v-model="data.email" type="text" placeholder="email" required><br>
        <input type="password" v-model="data.password" placeholder="password" required><br>
        <br>
        <button type="submit">Log in</button>
    </form>
</template>

<script>
import {reactive} from "vue"
import {useRouter} from "vue-router"

export default {
    name: "Login",
    setup() {
        const router = useRouter();
        const data = reactive({
            email: '',
            password: ''
        })

        async function submit() {
            await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
                body: JSON.stringify(data)
            })

            await router.push("/")
        }

        return {
            data,
            submit
        }
    }
}
</script>

<style>
</style>