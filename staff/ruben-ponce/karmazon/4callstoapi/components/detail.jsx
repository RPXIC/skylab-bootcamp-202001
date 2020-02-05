function Detail({ vehicle: { name, year, price, image, color, maker, collection, description, url }, style: { name: styleName, image: styleImage, url: styleUrl } }) {
    
    return  <li>
            <h3>{name} {year}</h3>
            <img src={image} />
            <span>{price}</span>
            <p>{color}</p>
            <p>{maker}</p>
            <p>{collection}</p>
            <p>{styleName}</p>
            <a>{styleUrl}</a>
            <img src={styleImage} />
            <p>{description}</p>
            <a>{url}</a>
            </li>
}
