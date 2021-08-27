const app = Vue.createApp({
    data() {
        return {
            description: "Besoin de connaître la météo des prochains jours ?",
            soustexte:"Vous êtes au bon endroit !",
            services:"Profitez également de nos autres services : réservation de restaurants, hébergements et bien d'autres encore... :"
        }
    }
})

app.mount('#app')