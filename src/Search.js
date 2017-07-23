import React, {Component} from 'react'
import escapeRegExp from 'escape-string-regexp'
import { Link } from 'react-router-dom'

class Search extends Component {

  state = {
    query: ''
  }

  updateQuery = () => {
  return null;
  }

  render() {

    const {query} = this.state

    return (
      /* todo:
      - Fix the link to go back to the main page
      - Search books by name and auther
      - any category changes from the searched books
        can affect the main page.
      */

      /*
      updatequery = (query) => {
        BooksAPI.search(query, 10).then((booksFound) => {
          this.setState({booksFound
          });
        })
      }
      */
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value= {query}
              onChange={(event) => this.updateQuery(event.target.value)}
              />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>

    )

  }

}

export default Search
