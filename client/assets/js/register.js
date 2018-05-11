const app = new Vue({
    el:'#app',
    data: {
        email: '',
        username: ''
    },
    methods: {
        register: function(){

            axios.post('http://35.198.212.156/request-token',{
                email: this.email,
                username: this.username
            })
             .then( response => {
                 console.log(response)
             })
             .catch( error => {
                 console.log('error dari upload.html',error)
             })
        },
        showImage: function(){
            axios.get('http://35.198.212.156/api/image', {

            })
             .then()
             .catch()
        }
    }
})