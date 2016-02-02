import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
    .then(() => {
      this.context.router.push('/');
    });
  }

  render() {
    const {post} = this.props;

    if(!post) {
      return <div>Loading ...</div>;
    }
    return (
      <div style={{marginTop: 20}}>
        <h3>{post.title}</h3>
        <hr />
        <h6>Categories: {post.categories}</h6>
        <hr />
        <p>{post.content}</p>
        <hr />
        <Link className="btn btn-primary" to="/">Back</Link>
        <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger pull-xs-right">Delete Post</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
