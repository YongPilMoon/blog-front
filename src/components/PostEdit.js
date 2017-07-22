import React, {Component} from 'react';
import {Redirect} from 'react-router';
import PostInput from './PostInput';
import config from '../../config/config';

class PostEdit extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const id = this.props.post.id;
        const route = `${config.API_URL}/post/${id}`;
        return(
            <PostInput title={this.props.post.title}
                       introduction={this.props.post.introduction}
                       content={this.props.post.content}
                       route={route}/>
        )
    }
}

export default PostEdit