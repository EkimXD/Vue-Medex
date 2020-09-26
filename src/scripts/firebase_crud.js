import {db} from '../firebase'
import {mapMutations} from 'vuex'

const methods={...mapMutations(['setLogged'])}

module.exports={
    login:(user, password)=>{
        return Promise((res,rej)=>{
            methods.setLogged(true, null)
            res(true)
        })
    }
}