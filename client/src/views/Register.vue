<template>
    <h1>Register</h1>
    <form v-on:submit.prevent="submit()">
        <input type="text" v-model="data.firstName" placeholder="first name" required><br>
        <input type="text" v-model="data.lastName" placeholder="last name" required><br>
        <input type="text" v-model="data.email" placeholder="email" required><br>
        <input type="password" v-model="data.password" placeholder="password" required><br>
        <br>
        <button type="submit">Submit</button>
    </form>
</template>

<script>
import {reactive} from "vue"
import {useRouter} from "vue-router"

export default {
    name: "Register",
    setup() {
        const router = useRouter()
        const data = reactive({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        });


        async function submit() {
            await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
        
            await router.push("/login")
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