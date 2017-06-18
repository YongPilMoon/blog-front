import React, {Component} from 'react';

class PostDetail extends React.Component {
    render() {
        if(!this.props.post){
            return <div>Loading...</div>;
        }

        return (
            <div>
                <div>title: {this.props.post.title}</div>
                <div>content: {this.props.post.content}</div>
            </div>
        )
    }
}

export default PostDetail