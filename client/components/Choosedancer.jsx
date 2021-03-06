import React, {Component} from 'react'
require('react-bootstrap-modal/lib/css/rbm-complete.css')
const Modal = require('react-bootstrap-modal')
import {toggleDancers, addDancer, fetchQueriedDancers} from '../store'
import {connect} from 'react-redux'


//React Modal which allows us to either choose from starting set of dancers or use searchbar to query for new set of dancers

class Choosedancer extends Component {
  constructor(props){
    super(props)
    this.state = {
      query: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e){
    this.setState({
      query: e.target.value
    })
  }

  handleSubmit(){
    this.props.handleDancerQuery(this.state.query)
  }

  render(){
    return (
      <Modal show = {this.props.showDancers} onHide = {this.props.handleToggleDancers} aria-labelledby="ModalHeader" >
      <Modal.Header />
          <Modal.Body>
            <div className = "dancer-container">
            {/* dancers rendered from allDancers redux state */}
            {this.props.allDancers.map(dancer => {
              return (
              <div onClick = {() => {this.props.handleAddDancer(dancer)}} key = {dancer.id} className = "dancer-thumbnail">
                <img  src = {dancer.images.fixed_height_small_still.url} />
              </div>
              )
            })}
            </div>
          </Modal.Body>
      <Modal.Footer >
            <div className = "wrap">
              <input onChange = {this.handleInputChange} type = "text" className = "searchbar" placeholder = "What are you looking for?" />
              <button onClick = {this.handleSubmit} type = "submit" className = "searchbutton">
                <i className = "fa fa-search" />
              </button>
            </div>
      </Modal.Footer>
    </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //closes the modal window
    handleToggleDancers(){
      dispatch(toggleDancers())
    },
    //renders Dancer component unto the Homepage by adding dancer object to dance floor dancers state
    handleAddDancer(dancer){
      dispatch(addDancer(dancer))
    },
    //sends http get request to GIPHY API endpoint with user generated query
    handleDancerQuery(query){
      dispatch(fetchQueriedDancers(query))
    }
  }
}

export default connect(state => state, mapDispatchToProps)(Choosedancer)
