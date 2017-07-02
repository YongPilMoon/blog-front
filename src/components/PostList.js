import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import changeDateFormat from '../helper'
import config from '../../config/config';

class PostList extends Component{
    constructor(props){
        super(props);

        this.state = {
            posts: []
        };

        this.getPostListData();
    }

    getPostListData(){
        const req = axios.get(`${config.API_URL}/post/list`);
        req.then(req => {
            this.setState({
                posts: req.data
            })
        });
    }

    render() {
        return(
            <ul>
                {this.state.posts.reverse().map(p => {
                    return (
                        <div key={p.id} className="post-list-wrapper">
                            <Link to={`/post/${p.id}`}>
                                <div className="post-list-title">{p.title}</div>
                            </Link>
                            <div className="post-list-introduction">{p.introduction}</div>
                            <div className="post-list-date">{changeDateFormat(p.createdAt)}</div>
                        </div>
                    );
                })}
            </ul>
        )
    }
}

export default PostList

