import React from 'react'
import {withRouter} from 'next/router'
import css from 'styled-jsx/css'

const styles = css`
  .search-container {
    display: flex;
    flex-flow: row;
    align-items: center;
  }
  input {
    outline: 0;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, .25);
  }
  button {
    outline: 0;
    padding: 5px;
    border: 0;
  }
`
class Search extends React.Component {
  state = { value: '' }
  handleChange = (e) => this.setState({
    value: e.target.value
  })
  search = (e) => {
    e.preventDefault()
    this.props.router.push(`/weather?city=${this.state.value}`, `/${this.state.value}`)
  }
  render = () => (
    <form className='search-container' action='/' onSubmit={this.search}>
      <style jsx>{styles}</style>
      <input
        name='city'
        value={this.state.value}
        onChange={this.handleChange}
      />
      <button>
        Search
      </button>
    </form>
  )
}

export default withRouter(Search);