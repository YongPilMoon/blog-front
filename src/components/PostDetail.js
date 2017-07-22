import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import PostEdit from "./PostEdit";
import config from '../../config/config';
import marked from 'marked';

class PostDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            post: null,
            redirectToMainPage: false
        };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.getPostDetail()
    }

    toggleEdit() {
        this.setState({isEditing: !this.state.isEditing})
    }

    getPostDetail(){
        const id = this.props.match.params.id;
        axios.get(`${config.API_URL}/post/${id}`)
            .then(req => {
                this.setState({
                    post: req.data
                })
            })
    };

    deletePost(){
        const id = this.props.match.params.id;
        axios.delete(`${config.API_URL}/post/${id}`)
            .then(res => this.setState({ redirectToNewPage: true }));
    }

    rawMarkUp() {
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        });

        var rawMarkup = marked(this.state.post.content, {sanitize: true});

        return {
            __html: rawMarkup
        }
    }

    render() {
        const isLoggedIn = this.props.isLoggedIn;
        if (this.state.redirectToNewPage) {
            return (
                <Redirect to="/"/>
            )
        }

        if(!this.state.post){
            return <div>Loading...</div>;
        }

        if(this.state.isEditing) {
            return (
                <div>
                    <PostEdit post={this.state.post}/>
                </div>
            )
        }

        return (
            <div>
                <h3>{this.state.post.title}</h3>
                <div dangerouslySetInnerHTML={this.rawMarkUp()}></div>
                {isLoggedIn &&
                    <div>
                        <button className="btn btn-warning btn-xs custom-btn-default" onClick={this.toggleEdit}>글 수정</button>
                        <button className="btn btn-danger btn-xs custom-btn-default custom-right-margin" onClick={this.deletePost.bind(this)}>글 삭제</button>
                    </div>
                }
            </div>
        )
    }
}

export default PostDetail