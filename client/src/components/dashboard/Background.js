import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteBackground } from '../../actions/profileActions';


class Background extends Component {
  onDeleteClick(id) {
    this.props.deleteBackground(id);
  }

  render() {
    const background = this.props.background.map(edu => (
      <tr key={edu._id}>
        <td>{edu.bio}</td>
        <td>
          <button onClick={this.onDeleteClick.bind(this, edu._id)} className="btn btn-danger" style={{ float: "right" }}>Delete</button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Background</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Bio</th>            
              <th></th> 
            </tr>
            {background}
          </thead>
        </table>
      </div>
    )
  }
};
      
Background.propTypes = {
            deleteBackground: PropTypes.func.isRequired  
        };
          
        
export default connect(null, { deleteBackground })(Background);