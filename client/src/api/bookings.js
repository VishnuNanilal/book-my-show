import axiosInstance from ".";

export async function MakePaymentAPI(token, amount){
    try{

        let response = await axiosInstance.post('/bookings/make-payment', {token, amount})
        return response.data
    }
    catch(err){
        return err.response.data
    }
}
    
export async function BooKShowAPI(payload){
    try{
        let response = await axiosInstance.post('/bookings/book-show', payload)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function GetBookingsById(userid){
    try{
        let response = await axiosInstance.get(`/bookings/get-bookings/${userid}`)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}


/*Object
card
: 
{id: 'card_1P6hi7SJ2B5Vx684BcgSaHmo', object: 'card', address_city: null, address_country: null, address_line1: null, …}
client_ip
: 
"103.155.223.1"
created
: 
1713395775
email
: 
"vishnunlal@gmail.com"
id
: 
"tok_1P6hi7SJ2B5Vx6848gTY2fXm"
livemode
: 
false
object
: 
"token"
type
: 
"card"
used
: 
false
[[Prototype]]
: 
Object*/