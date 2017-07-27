import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI.js'

class Search extends Component {

  state = {
    query: '',
    foundBooks: []
  }

  onSearch = (query) => {

    this.setState( {query: query} )
    if(query === undefined || query === "") {
      return this.setState( {query: "", foundBooks: []} )
    }

    BooksAPI.search(query, 20).then((result) => {
      if(result === undefined || result.error === 'empty query') {
        return this.setState({foundBooks: []})
      }
      return this.setState({foundBooks: result})
    })

  }

  render() {

    const {foundBooks} = this.state
    const {onChangeShelf} = this.props

    let booksToDisplay

    if(!foundBooks) {
      booksToDisplay = []
    }

    else {

      booksToDisplay = foundBooks.map((foundBook) => (

        <li key={foundBook.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${foundBook.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select id={foundBook.id} value={foundBook.shelf} onChange={onChangeShelf}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{foundBook.title}</div>
            <div className="book-authors">{foundBook.authors}</div>
          </div>
        </li>
      ))
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
