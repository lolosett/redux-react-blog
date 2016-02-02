import React, { Component } from 'React';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link style={{height: '100%', width: '100%'}} to={`posts/${post.id}`}>
            <span className="pull-xs-right">{post.categories}</span>
            <strong>{post.title}</strong>
          </Link>
        </li>
      )
    });
  }

  render() {
    return (
      <div style={{marginTop: 20}}>
        <h3>Posts</h3>
        <hr />
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
        <hr />
        <div className='text-xs-right'>
          <Link to="posts/new" className='btn btn-primary'>
            Add a Post
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.all };
}
// NOTE: shortcut that automatically calls mapDispatchToProps
// ES6 shortcut as well { fetchPosts } => { fetchPosts: fetchPosts }
export default connect(mapStateToProps, { fetchPosts: fetchPosts })(PostsIndex);
