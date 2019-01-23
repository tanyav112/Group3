import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBackground } from '../../actions/profileActions';


class AddBackground extends Component {
     constructor(props) {
          super(props);
          this.state = {
               bio: '',
               errors: {},
            };

          this.onChange = this.onChange.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
          this.onCheck = this.onCheck.bind(this);
     }


     componentWillReceiveProps(nextProps) {
          if (nextProps.errors) {
               this.setState({ errors: nextProps.errors })
          }
     }

     onSubmit(e) {
          e.preventDefault();
          const eduData = {
               bio: this.state.bio,
             };

          this.props.addBackground(eduData, this.props.history);
     }

     onChange(e) {
          this.setState({ [e.target.name]: e.target.value });
     }

     onCheck(e) {
          this.setState({
               disabled: !this.state.disabled,
               current: !this.state.current
          });
     }

     render() {
          const { errors } = this.state;

          return (
               <div className="add-background">
                    <div className="container">
                         <div className="row">
                              <div className="col-md-8 m-auto">
                                   <Link to='/dashboard' className="btn btn-light">
                                        Go Back</Link>
                                   <h1 className="display-4 text-center">Add Background</h1>
                                   <p className="lead text-center">Please tell us about your background</p>
                                   <small className="d-block pb-3">* = required fields</small>

                                   <form onSubmit={this.onSubmit}>
                                                                   
                                        <TextAreaFieldGroup
                                             placeholder="* Bio"
                                             name="bio"
                                             value={this.state.bio}
                                             onChange={this.onChange}
                                             error={errors.bio}
                                             info="Tell us about your background"
                                        />
                                        <input style={{ float: "right" }} type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>
          )
     }
}


AddBackground.propTypes = {
     addBackground: PropTypes.func.isRequired,
     profile: PropTypes.object.isRequired,
     errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
     profile: state.profile,
     errors: state.errors,
})

export default connect(mapStateToProps, { addBackground })(withRouter(AddBackground));