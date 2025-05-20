import { useState } from 'react'

export default function Home() {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [books, setBooks] = useState([])

	const handleChangeTitle = event => setTitle(event.target.value)
	const handleChangeAuthor = event => setAuthor(event.target.value)

	const handleSubmit = async e => {
		e.preventDefault()

		const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
		const query = `intitle:${title}+inauthor:${author}`
		const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`

		try {
			const response = await fetch(url)
			const data = await response.json()

			if (data.items && data.items.length > 0) {
				setBooks(data.items)
			} else {
				setBooks([])
			}
		} catch (error) {
			console.error('Błąd pobierania książek:', error)
			setBooks([])
		}

		setTitle('')
		setAuthor('')
	}

	const userBookToLocalStorage = book => {
		const saved = JSON.parse(localStorage.getItem('savedBooks')) || []
		const exists = saved.some(b => b.id === book.id)

		if (!exists) {
			saved.push(book)
			localStorage.setItem('savedBooks', JSON.stringify(saved))
			alert(`Zapisano książke: ${book.volumeInfo.title}`)
		} else {
			alert('Ta ksiazka jest już zapisana')
		}
	}

	return (
		<div className='wrapper'>
			<header>
				<h1 className='headerTitle'>Twoja własna biblioteka książek!</h1>
				<p className='headerText'>
					Wpisz szukaną książkę poniżej i dodaj ją do swojej biblioteki przeczytanych książek.
				</p>
            </header>
            
            <div className="formBox">

			<form onSubmit={handleSubmit}>
				<div className='inputControl'>
					<label htmlFor='title'>Wpisz tytuł książki:</label>
					<input
						id='title'
						type='text'
						value={title}
						onChange={handleChangeTitle}
						placeholder='Tytuł książki'
						required
					/>
				</div>

				<div className='inputControl'>
					<label htmlFor='author'>Wpisz nazwę autora ksiązki:</label>
					<input id='author' type='text' value={author} onChange={handleChangeAuthor} placeholder='Autor' required />
                    </div>
                    <div className='btnBox'>

				<button className='btn' type='submit'>Szukaj</button>
                    </div>
			</form>
            </div>


			<div className='searchResult'>
				<h3 className='searchResultTitle'>Znaleźione książki:</h3>
				{books.length === 0 ? (
					<p className='searchResultText'>Brak wyników.</p>
				) : (
					<ul className='booksLists'>
						{books.map((book, index) => {
							const info = book.volumeInfo
							return (
                                <li className='bookItem' key={book.id || index}>
                                    <h3>{info.title}</h3>
                                    <p>Autorzy: {info.authors?.join(', ') || 'Brak autora'}</p>
									{info.imageLinks?.thumbnail && <img className='cover' src={info.imageLinks.thumbnail} alt={info.title} />}

									<button className='btnSave' onClick={() => userBookToLocalStorage(book)}>Zapisz</button>
								</li>
							)
						})}
					</ul>
				)}
			</div>
		</div>
	)
}
