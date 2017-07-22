import React, {Component} from 'react';
import {Redirect} from 'react-router';
import PostInput from './PostInput';
import config from '../../config/config';

class PostCreate extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const route = `${config.API_URL}/post`;
        return(
        <PostInput title=""
                   introduction=""
                   content= {localStorage.getItem('markdownStorage') || '### Type Markdown Here'}
                   route={route}/>
        )
    }
}

export default PostCreate