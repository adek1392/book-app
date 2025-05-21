import { useEffect, useState } from 'react'
import bookCover from '../assets/img/bookCover.png'

export default function Read() {
	const [readBooks, setReadBooks] = useState([])

	useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedBooks')) || []
        setReadBooks(saved)
	}, [])

	const removeBook = id => {
		const updated = readBooks.filter(book => book.id !== id)
		setReadBooks(updated)
		localStorage.setItem('savedBooks', JSON.stringify(updated))
	}

    return (
        <main>
<div className='readBox'>
           
			<h3 className='readBoxTitle'>Lista przeczytanych książek:</h3>
			<ul className='readBooksList'>
				{readBooks.map(book => {
					const info = book.volumeInfo
					return (
						<li className='readBooksItem' key={book.id}>
							<h3>{info.title}</h3>
							<p>Autorzy: {info.authors?.join(', ') || 'Brak autora'}</p>
                            {info.imageLinks?.thumbnail && <img className='readBookCover' src={info.imageLinks.thumbnail} alt={info.title} /> || <img className='emergencyReadBookCover' src={bookCover } alt='stos książek ułożonych na sobie ' />}
                            <button className='btnDelete' onClick={()=> removeBook(book.id)}>Usuń</button>
						</li>
					)
				})}
			</ul>
		</div>
        </main>
        
	)
}
