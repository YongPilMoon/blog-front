import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class PostDetail extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            post: null,
            redirectToMainPage: false
        };

        this.getPostDetail()
    }
    getPostDetail(){
        const id = this.props.match.params.id;
        axios.get(`http://52.79.209.163:3000/post/${id}`)
        .then(req => {
        this.setState({
            post: req.data
        })
    })
    };

    deletePost(){
        const id = this.props.match.params.id;
        axios.delete(`http://52.79.209.163:3000/post/${id}`)
        .then(response => {
            console.log("deleted");
            this.setState({ redirectToNewPage: true })
        });
    }

    render() {
        if (this.state.redirectToNewPage) {
            return (
                <Redirect to="/"/>
            )
        }

        if(!this.state.post){
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h1> {this.state.post.title}</h1>
                <div>{this.state.post.content}</div>
                <div>
                    <button className="btn btn-warning btn-xs custom-btn-default">modify</button>
                    <button className="btn btn-danger btn-xs custom-btn-default custom-right-margin" onClick={this.deletePost.bind(this)}>글 삭제</button>
                </div>
            </div>
        )
    }
}

export default PostDetail