function Results({ results, onItemClick, toggleHeart }) {
    return  <ul className="results">
            {results.map(item => < Item key={item.id} item={item} onClick={onItemClick} toggleHeart={toggleHeart} /*heart={item.heart}*/ />)}
            </ul>
}
