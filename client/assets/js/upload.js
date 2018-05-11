const app = new Vue({
    el:'#app',
    data: {
        image: ''
    },
    headers: {'Authorization': Bearer + '98XeonFJenwVH7akBrP4ry'},
    methods: {
        uploadImg: function(){            

            let fileInput = document.querySelector('#image');
            console.log(fileInput)

            let formData = new FormData()
            formData.append('image', fileInput.files[0])

            axios.post('http://35.198.212.156/api/image',formData)
             .then( response => {
                 console.log(response)
             })
             .catch( error => {
                 console.log('error dari upload.html',error)
             })
        }
    }
})