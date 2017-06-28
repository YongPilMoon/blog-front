import React, {Component} from 'react';
import axios from 'axios';

class PostDetail extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            post: null
        };

        this.getPostDetail()
    }
    getPostDetail(){
        const id = this.props.match.params.id;
        const req = axios.get(`http://52.79.209.163:3000/post/${id}`);
        req.then(req => {
            this.setState({
                post: req.data
            })
        })
    };

    render() {
        if(!this.state.post){
            return <div>Loading...</div>;
        }

        return (
            <div className="col-md-9">
                <h1> {this.state.post.title}</h1>
                <div>{this.state.post.content}</div>
                <div>
                    <button className="btn btn-warning btn-sm custom-btn-default">delete</button>
                </div>
            </div>
        )
    }
}

export default PostDetail