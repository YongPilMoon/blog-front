import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
                {this.state.posts.map(p => {
                    return (
                        <Link key={p.id} to={`/post/${p.id}`}>
                            <h1 className="list-item">{p.title}</h1>
                        </Link>
                    );
                })}
            </ul>
        )
    }
}

export default PostList

