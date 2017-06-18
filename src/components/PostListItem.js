import React, {Component} from 'react';
import axios from 'axios';

class PostListItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            post: null
        }
    }

    getPostDetail(){
        const id = this.props.id;
        const req = axios.get(`http://localhost:3000/post/${id}`);
        req.then(req => this.props.onPostSelect(req.data))
    };

    render() {
        return (
            <li onClick={() => this.getPostDetail()}>{this.props.title}</li>
        );
    }
}

export default PostListItem