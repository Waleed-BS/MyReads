import React from 'react'
import { Route, Link } from 'react-router-dom'
import Bookshelf from './Bookshelf.js'
import Search from './Search.js'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    booksArray: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( (books) => {
      this.setState({booksArray: books})
    })
  }

  // onChangeShelf = (event) =>  {
  //   BooksAPI.update({id: event.target.id}, event.target.value).then( () => {
  //     BooksAPI.getAll().then( (books) => {
  //       this.setState({booksArray: books})
  //     })
  //   })
  // }

  onChangeShelf = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(response => {
      this.setState(state => {
        booksArray: state.booksArray.filter(b => b.id !== book.id).concat([ book ])
      })
    })
  }

  // BooksAPI.update(book, shelf).then(() => {
  //       book.shelf = shelf
  //
  //       // Filter out the book and append it to the end of the list
  //       // so it appears at the end of whatever shelf it was added to.
  //       this.setState(state => ({
  //         books: state.books.filter(b => b.id !== book.id).concat([ book ])
  //       }))
  //     })

  render() {

    const {booksArray} = this.state

    return (

      <div className="app">

        <Route exact path='/' render={()=>(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf category="Currently Reading" booksInShelf={ booksArray.filter( (book) => book.shelf === "currentlyReading" ) } onChangeShelf={this.onChangeShelf}/>
                  <Bookshelf category="Want to Read" booksInShelf={ booksArray.filter( (book) => book.shelf === "wantToRead" ) } onChangeShelf={this.onChangeShelf}/>
                  <Bookshelf category="Read" booksInShelf={ booksArray.filter( (book) => book.shelf === "read" ) } onChangeShelf={this.onChangeShelf}/>
                </div>
              </div>
              <div className="open-search">
                <Link to="./search"> Add a book </Link>
              </div>
            </div>
        )}/>

        <Route path='/search' render={ () => (
            <Search onChangeShelf={this.onChangeShelf}/>
        )}/>

      </div>

    )

  }

}

export default BooksApp
