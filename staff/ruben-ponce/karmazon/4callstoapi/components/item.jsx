function Item({ item: { id, name, thumbnail, price, heart }, onClick, toggleHeart }) {
    return <div>
            <div>
            <h3>{name}</h3> {heart ? <HeartRed id={id} onClick={toggleHeart}/> : <Heart id={id} onClick={toggleHeart} /> }
            </div>
            <img src={thumbnail} onClick={() => {onClick(id)}  }/>
            <span>{price}</span>
            </div>
}