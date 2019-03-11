const axios = require('axios')

//axios.post        
const rl = 'http://localhost:1337/people'
//const user={"name":"Nash","age":12,"_id":"5c338c41bdb0845e5a181680","createdAt":"2019-01-07T17:28:33.727Z","updatedAt":"2019-01-07T17:28:33.750Z","__v":0,"id":"5c338c41bdb0845e5a181680"}
const user={"name":"John","age":21}
axios({
    method: 'post',
    url: rl,
    data: user,
    headers: {
    'Content-Type': 'application/json'
    }
})
.then(data=>console.log(data.data))
.catch(err=>console.log(err))


//axios.get
axios.get(rl)
.then(data=>console.log(data.data))
.catch(err=>console.log(err))
//console.log(people)