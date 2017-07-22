import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import Bookshelf from './Bookshelf.js'
import Search from './Search.js'

class BooksApp extends React.Component {
  state = {
    booksArray: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( (books) => {
      this.setState({booksArray: books})
    })
  }

  onChangeShelf() {
    BooksAPI.update().then( () => {
      this.setState({})
    })
  }

  render() {

    const {booksArray} = this.state
    const {onChangeShelf} = this.onChangeShelf

    return (

      <div className="app">
        <Route exact path='/' render={()=>(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf category="Currently Reading" books={ booksArray.filter( (book) => book.shelf == "currentlyReading" ) } onChangeShelf={this.onChangeShelf}/>
                  {/* 
                  <Bookshelf category="Currently Reading" books="" onChangeShelf={this.onChangeShelf}/>
                  <Bookshelf category="Currently Reading" books="" onChangeShelf={this.onChangeShelf}/>
                  */}
                </div>
              </div>
              <div className="open-search">
                <Link to="./search">Add a book</Link>
              </div>
            </div>
        )}/>
        <Route path='/search' render={() => (

            <Search>



            </Search>

        )}/>

      </div>

    )

  }

}

export default BooksApp
