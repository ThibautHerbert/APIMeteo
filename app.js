const app = Vue.createApp({
    data() {
        return {
            description: "Besoin de connaître la météo des prochains jours ?",
            soustexte:"Vous êtes au bon endroit !",
            services:"Profitez également de nos autres services : réservation de restaurants, hébergements et bien d'autres encore... :",
            urlApi: "",
            meteos: [],
            nameCity: "",
            current_condition: "",
            temperature:"",
            icon: "",
            testResultat: "",
            villeCherchee: "",
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
        //appeler la prévision pour la ville en mounted :
        this.fetchToday()
        // fetch des données concernant les prévisions prochaines
        this.fetchNextDay()
        this.fetchThirdDay()
        this.fetchFourthDay()

    },
    
    
    methods: {
        clicki(){
            console.log("cliqué");
            let result = document.querySelector('#weather-result');
            let btn = document.querySelector('#ask-weather');
                //result.innerHTML = "bonjour, ça marche";
                // result.innerHTML = this.testResultat.current_condition.condition; condition pas connu
                //result.innerHTML = this.testResultat;
                
        },
        callApi() {
            let askWeather = new XMLHttpRequest();
            
            askWeather.open("GET", "https://www.prevision-meteo.ch/services/json/nantes");
            askWeather.send();
            askWeather.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    let response = JSON.parse(this.responseText);
                    //let réponse2 = "coucou";
                    //réponse2 = this.testResultat;
                    //response = this.testResultat;
                    //console.log("onreadystate", response.current_condition.condition);
                    //response = this.testResultat;
                    let result = document.querySelector('#weather-result');
                        result.innerHTML = response.current_condition.condition;
                    let nameCity = document.querySelector('#nameCity');
                    nameCity.innerHTML = response.city_info.name;
                    let imgMeteo = document.querySelector('#imgMeteo');
                    let content = `<img src="${response.current_condition.icon}" class="card-img-top" alt="icône météo">`
                    imgMeteo.insertAdjacentHTML("beforeend", content);
                    this.meteos = response;
                    
                }
            }
            //.then(() => console.log("onreadystate", response.current_condition.condition))
        },
        fetchCityInfo(){
            fetch('https://www.prevision-meteo.ch/services/json/nantes/city_info') // fetch('https://www.prevision-meteo.ch/services/json/' + villeCherchee)
                .then(res => res.json())
                .then(city => this.nameCity = city.city_info)
                .catch(err => console.log(err.message))
        },
        fetchToday(){
            fetch('https://www.prevision-meteo.ch/services/json/nantes') // fetch('https://www.prevision-meteo.ch/services/json/' + villeCherchee)
                .then(res => res.json())
                //.then(response => this.meteos = response.data)
                //.then(data => this.meteos = data.city_info) // si utilisée empâche le condition de fonctionner !
                //.then(data => this.nameCity = data)
                
                //.then(data => this.nameCity = data.city_info.name)
                .then(condition => this.current_condition = condition.current_condition)
                // marchent pas :
                .then(temperature => this.temperature = temperature.current_condition.tmp)
                .then(city => this.nameCity = city)
        
        /*
        let response = JSON.parse(this.responseText);
        let result = document.querySelector('#weather-result');
            result.innerHTML = response.current_condition.condition;
        let nameCity = document.querySelector('#nameCity');
            nameCity.innerHTML = response.city_info.name;
        let imgMeteo = document.querySelector('#imgMeteo');
        let content = `<img src="${response.current_condition.icon}" class="card-img-top" alt="icône météo">`
            imgMeteo.insertAdjacentHTML("beforeend", content);
        this.meteos = response;
*/
               .catch(err => console.log(err.message))
        },
        fetchNextDay() {
            fetch('https://www.prevision-meteo.ch/services/json/nantes/fcst_day_1') // fetch('https://www.prevision-meteo.ch/services/json/' + villeCherchee)
                .then(res => res.json())
                .then(condition2 => this.meteoNextDay = condition2.fcst_day_1) //.fcst_day_1
                .then(response => console.log(response))
                // marchent pas :
                //.then(temperature => this.meteoNextDay = temperature.current_condition.tmp)
                //.then(city => this.nameCity = city)
                .catch(err => console.log(err.message))
        },
        fetchThirdDay() {
            fetch('https://www.prevision-meteo.ch/services/json/nantes/fcst_day_2') // fetch('https://www.prevision-meteo.ch/services/json/' + villeCherchee)
                .then(res => res.json())
                .then(condition3 => this.meteoThirdDay = condition3.fcst_day_2) //.fcst_day_1
                .then(response => console.log(response))
                // marchent pas :
                //.then(temperature => this.meteoNextDay = temperature.current_condition.tmp)
                //.then(city => this.nameCity = city)
                .catch(err => console.log(err.message))
        },
        fetchFourthDay() {
            fetch('https://www.prevision-meteo.ch/services/json/nantes/fcst_day_3') // fetch('https://www.prevision-meteo.ch/services/json/' + villeCherchee)
                .then(res => res.json())
                .then(condition4 => this.meteoFourthDay = condition4.fcst_day_3) //.fcst_day_1
                .then(response => console.log(response))
                // marchent pas :
                //.then(temperature => this.meteoNextDay = temperature.current_condition.tmp)
                //.then(city => this.nameCity = city)
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