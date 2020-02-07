const IT = '🎈🤡'

const { Component, Fragment } = React

class App extends Component {

    state = { view: 'login', loggedIn: false, vehicles: undefined, vehicle: undefined, style:undefined, error: undefined, token: undefined, user: undefined}

    handleLogin = (username, password) => {
        try {
            authenticateUser(username, password, (error, token) => {
                if (error) {
                    this.setState({ error: error.message + ' ' + IT })

                    setTimeout(() => {
                        this.setState({ error: undefined })
                    }, 3000)
                } else {
                    retrieveUser(token, (error, user) => {
                        if(error)
                            return this.setState({ error: error.message + ' ' + IT })
                        sessionStorage.token = token
                        this.setState({ view: 'search', user })
                    })
                }
            })
        } catch (error) {
            this.setState({error: error.message + ' ' + IT})

            setTimeout(() => {
                this.setState({error: undefined})
            }, 3000)
        }    
    }

    handleGoToRegister = () => this.setState({view: 'register'})

    handleRegister = (name, surname, username, password) => {
        try {
            registerUser(name, surname, username, password, error => {
                if (error) { 
                    this.setState({error: error.message + ' ' + IT})

                    setTimeout(() => {
                        this.setState({error:undefined})
                    }, 2000)
                } else {
                    this.setState({view: 'login'})
                }
            })
        } catch (error) {
            this.setState({error: error.message + ' ' + IT})

            setTimeout(() => {
                this.setState({error:undefined})
            }, 2000)
        }
    }

    handleGoToLogin = () => this.setState({view: 'login'})
    
    handleSearch = query => {
        const {token} = sessionStorage
        searchVehicles(query, token, (error, vehicles) => {

            const {protocol, host, pathname} = location

            const url = `${protocol}//${host}${pathname}?q=${query}`

            history.pushState({path: url}, '', url)

            this.setState({vehicles, vehicle: undefined, error: vehicles.length ? undefined : 'No results' + IT })
        })
    }

    handleResults = id => {
        retrieveVehicle(id, (error, vehicle) =>
            retrieveStyle(vehicle.style, (error,style) =>
                this.setState({ vehicle, style, vehicles: undefined })
            )
        )
    }
    handleHeart = id => {
        try {
            const { token } = sessionStorage
            
            toggleFavVehicle(token, id, (error, query) => {
                this.handleSearch(query)
            })
        } catch (error) {
            this.setState({error: error.message + ' ' + IT})

            setTimeout(() => {
                this.setState({error:undefined})
            }, 2000)
        }
    }

    render() {

        const {props: {title}, state: {view, vehicles, vehicle, error, style, user}, handleLogin, handleGoToLogin, handleGoToRegister, handleRegister, handleSearch, handleResults, handleHeart} = this 

        return  <Fragment>

            {user && <p>Welcome: {user.name}</p>} 

            <h1>{title}</h1>

            { view === 'login' && < Login onSubmit={handleLogin} onToRegister={handleGoToRegister} error={error} /> }

            { view === 'register' && < Register onSubmit={handleRegister} onToLogin={handleGoToLogin} error={error} /> }

            { view === 'search' && < Search title= 'Search' onSubmit={handleSearch} error={error} />}

            { view === 'search' && vehicles && < Results results={vehicles} onItemClick={handleResults} toggleHeart={handleHeart} /> }

            { view === 'search' && vehicle && < Detail vehicle={vehicle} style={style} /> }

                </Fragment>
    }
}