import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI.js'
import Books from './Books.js'

class Search extends React.Component {

  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    foundBooks: []
  }


  componentWillReceiveProps() {
    BooksAPI.getAll().then( (books) => {
      this.setState({booksArray: books})
    })
  }

  onSearch = (query) => {

    this.setState( {query: query} )
    if(query === undefined || query === "") {
      this.setState( {query: "", foundBooks: []} )
    }

    BooksAPI.search(query, 20).then((result) => {
      if(result === undefined || result.error === 'empty query') {
        this.setState({foundBooks: []})
      }
      else {
        const updateExistingBooks = result.map((result2) => {
          const match =  this.props.books.find( (existingBook) => existingBook.id === result2.id )
          return match ? match : result2
        })
        this.setState({foundBooks: updateExistingBooks})
      }
    })

  }

  // onChangeShelf = (book, shelf) => {
  //   console.count("onChangeShelf in search")
  //   book.shelf = shelf
  //   BooksAPI.update(book, shelf).then(() => {
  //     console.count("BooksAPI.update in search")
  //     this.setState(state => {
  //       booksArray: this.state.filter(b => b.id !== book.id).concat([ book ])
  //     })
  //   })
  // }

  render() {

    const {foundBooks} = this.state
    const {onChangeShelf} = this.props

    let booksToDisplay

    if(!foundBooks) {
      booksToDisplay = []
    }

    else {

      booksToDisplay =
      <Books books={foundBooks} onChangeShelf={onChangeShelf}/>
      //foundBooks.map((foundBook) => (
        // <li key={foundBook.id}>
        //   <div className="book">
        //     <div className="book-top">
        //       <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${foundBook.imageLinks.thumbnail})` }}></div>
        //       <div className="book-shelf-changer">
        //         <select id={foundBook.id} value={foundBook.shelf} onChange={(event) => onChangeShelf(foundBook, event.target.value)}>
        //           <option value="none" disabled>Move to...</option>
        //           <option value="currentlyReading">Currently Reading</option>
        //           <option value="wantToRead">Want to Read</option>
        //           <option value="read">Read</option>
        //           <option value="none">None</option>
        //         </select>
        //       </div>
        //     </div>
        //     <div className="book-title">{foundBook.title}</div>
        //     <div className="book-authors">{foundBook.authors}</div>
        //   </div>
        // </li>
      // ))
    }

    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.onSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            { booksToDisplay }
          </ol>
        </div>
      </div>

    )

  }

}

export default Search
