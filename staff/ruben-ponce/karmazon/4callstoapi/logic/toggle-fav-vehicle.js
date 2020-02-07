function toggleFavVehicle(token, id, callback) {    
    call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
        method: 'GET',
        headers: { 'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
    }, (error, response) => {
        if (error) return callback(error)

        const user = JSON.parse(response.content)
        if(error) return callback(new Error(error))
        
        let { fav } = user
        
        if(fav === undefined) {
            fav = [id]
        }else{
           fav.includes(id) ? fav = fav.filter(car=> car !== id ) : fav.push(id)
        }
        
        call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
            method: 'PATCH',
            headers: { 'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${token}`
        },
            body: JSON.stringify({fav})
        }, (error, response) => {
            if (error) return callback(error)
            
            const query = location.search.split('=')[1]

            callback(undefined, query)
        })
    })
}