const app = Vue.createApp({
    data() {
        return {
            description: "Besoin de connaître la météo des prochains jours ?",
            subtext:"Vous êtes au bon endroit !",
            services:"Profitez également de nos autres services : réservation de restaurants, hébergements et bien d'autres encore... :",
            urlApi: "https://www.prevision-meteo.ch/services/json/",
            nameCity: "",
            current_condition: "",
            searchCityInput: "Nantes",
            meteoNextDay:"",
            meteoThirdDay:"",
            meteoFourthDay:"",
            showNextDay: false,
            showThirdDay: false,
            showFourthDay: false
        }
    },
    
    mounted(){
        this.fetchCityInfo()
        //appelle la prévision du jour pour la ville:
        this.fetchToday()
        // fetch des données concernant les prévisions prochaines
        this.fetchNextDay()
        this.fetchThirdDay()
        this.fetchFourthDay()
    },
    methods: {
        fetchCityInfo(){
            fetch(this.urlApi + this.searchCityInput + '/city_info') 
                .then(res => res.json())
                .then(city => this.nameCity = city.city_info)
                .catch(err => console.log(err.message))
        },
        fetchToday(){
            fetch(this.urlApi + this.searchCityInput) 
                .then(res => res.json())
                .then(condition => this.current_condition = condition.current_condition)
                .catch(err => console.log(err.message))
        },
        fetchNextDay() {
            fetch(this.urlApi + this.searchCityInput + '/fcst_day_1') 
                .then(res => res.json())
                .then(condition2 => this.meteoNextDay = condition2.fcst_day_1)
                .then(response => console.log(response))
                .catch(err => console.log(err.message))
        },
        fetchThirdDay() {
            fetch(this.urlApi + this.searchCityInput + '/fcst_day_2') 
                .then(res => res.json())
                .then(condition3 => this.meteoThirdDay = condition3.fcst_day_2)
                .then(response => console.log(response))
                .catch(err => console.log(err.message))
        },
        fetchFourthDay() {
            fetch(this.urlApi + this.searchCityInput + '/fcst_day_3') 
                .then(res => res.json())
                .then(condition4 => this.meteoFourthDay = condition4.fcst_day_3)
                .then(response => console.log(response))
                .catch(err => console.log(err.message))
        },
        toggleNextDay() {
            this.showNextDay = !this.showNextDay
            // conditions pour faire disparaitre les autres prévisions
            if (this.showThirdDay = true) {
                this.showThirdDay = !this.showThirdDay
            }
            if (this.showFourthDay = true) {
                this.showFourthDay = !this.showFourthDay
            }
        },
        toggleThirdDay(){
            this.showThirdDay = !this.showThirdDay
            // conditions pour faire disparaitre les autres prévisions
            if (this.showNextDay = true) {
                this.showNextDay = !this.showNextDay
            } 
            if (this.showFourthDay = true) {
                this.showFourthDay = !this.showFourthDay
            }
        },
        toggleFourthDay(){
            this.showFourthDay = !this.showFourthDay
            // conditions pour faire disparaitre les autres prévisions
            if (this.showNextDay = true) {
                this.showNextDay = !this.showNextDay
            }
            if (this.showThirdDay = true) {
                this.showThirdDay = !this.showThirdDay
            }
        }
    }, 
})

app.mount('#app')