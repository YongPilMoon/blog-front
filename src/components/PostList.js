import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import changeDateFormat from '../helper'

class PostList extends Component{
    constructor(props){
        super(props);

        this.state = {
            posts: []
        };

        this.getPostListData();
    }

    getPostListData(){
        const req = axios.get('http://localhost:3000/post/list');
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
                        <div key={p.id} className="post-wrapper">
                            <Link to={`/post/${p.id}`}>
                                <h1 className="post-title">{p.title}</h1>
                            </Link>
                            <div className="post-date">{changeDateFormat(p.createdAt)}</div>
                        </div>
                    );
                })}
            </ul>
        )
    }
}

export default PostList

