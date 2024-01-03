<template>
    <p>{{message}}</p>
</template>

<script>
import {onMounted, ref} from "vue"

export default {
    name: "Home",
    setup() {
        const message = ref("You are not logged in!")
        onMounted(async function() {
            const response = await fetch("http://localhost:3000/api/user", {
                headers: {"Content-Type": "application/json"},
                credentials: 'include'
            })

            const content = await response.json()
            message.value = "Logged in as: " + content.firstName + " " + content.lastName
        })

        return {
            message
        }
    }
}
</script>

<style>
</style>