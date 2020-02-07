function HeartRed(props){
    return <i onClick={() => props.onClick(props.id)} style={{color: 'red'}} className="fas fa-heart"></i>
}