function Register({ onSubmit, onToLogin, error }) {
    return  <form className="register" onSubmit={event => {
        event.preventDefault()
        debugger
        const name = event.target.name.value
        const surname = event.target.surname.value
        const username = event.target.username.value
        const password = event.target.password.value
        debugger
        onSubmit(name, surname, username, password)
    }}>
        <h2>Sign-up</h2>

        {/* {error && <Feedback level="error" message={error}/>} */}

        <input type="text" name="name" placeholder="name" />
        <input type="text" name="surname" placeholder="surname" />
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="password" placeholder="password" />
        <button>Register</button>
        <a href="" onClick={ event => {
            event.preventDefault()

            onToLogin()
        }}>Login</a>

        </form>
}
