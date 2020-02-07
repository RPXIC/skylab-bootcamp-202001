function searchVehicles(query, token, callback) {
    if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles?q=${query}`, undefined, (error, response) => {
        if (error) return callback(error)

        if (response.status === 200) {
            var results = JSON.parse(response.content)

            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
            method: 'GET',
            headers: { 
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        }, (error, response) => {
            if (error) return callback(error)
           
            const user = JSON.parse(response.content)

            let { fav } = user
            
            if(fav){
                
                for (let i = 0; i < results.length; i++) {
                    for (let j = 0; j < fav.length; j++) {
                        if( results[i].id === fav[j] ){
                        results[i].heart = true
                        }     
                    }
                }

                  
            }
            callback(undefined, results)
        })}
    })
}