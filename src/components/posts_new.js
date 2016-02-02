import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  // Defining an object on the PostsNew class
  // React interprets this object when postsNew is created
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
    .then(() => {
      // blog post has been creaetd navigate the user to the index
      // we navigate by calling this.context.router.push with
      // the new path to navigate to.
      this.context.router.push('/');
    });

  }

  render() {
    // ES6 destructuring again equivalent to
    // const handleSubmit = this.props.handleSubmit
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} style={{marginTop: 20}}>
        <h3>Create A Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <lablel>Title</lablel>
          <input className="form-control" type="text" {...title} />
          <div className="text-help"> {title.touched ? title.error : ''} </div>
        </div>
        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <lablel>Categories</lablel>
          <input className="form-control" type="text" {...categories}/>
          <div className="text-help"> {categories.touched ? categories.error : ''} </div>
        </div>
        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <lablel>Content</lablel>
          <textarea className="form-control" {...content}/>
          <div className="text-help"> {content.touched ? content.error : ''} </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger pull-xs-right"> Cancel </Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};
  if(!values.title) {
    errors.title = 'Enter a username'
  }
  if(!values.categories) {
    errors.categories = 'Enter a username'
  }
  if(!values.content) {
    errors.content = 'Enter a username'
  }
  return errors;
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: first is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNew',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
