function Search({ title, onSubmit, error }) {
    return  <form className="search" onSubmit={event => {
            event.preventDefault()
            
            const query = event.target.query.value
            onSubmit(query)
            }}>
            <h2>{title}</h2>

            {error && <Feedback level="error" message={error}/>}

            <input type="text" name="query" placeholder="criteria" />
            <button type="submit">Search</button>
            </form>
}

    // __locateFeedbackInContainer__(feedback) {
    //     this.container.append(feedback.container)

