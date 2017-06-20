import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';

class PostCreate extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            content: "",
            redirectToMainPage: false
        }
    }

    render(){
        if (this.state.redirectToNewPage) {
            return (
                <Redirect to="/"/>
            )
        }

        return (
                <div className="form-group">
                        <input type="text"
                               name="title"
                               placeholder="title"
                               className="form-control custom-form-margin"
                               value={this.state.title}
                               onChange={this.handleChange.bind(this)}/>
                        <textarea className="form-control custom-form-margin custom-textarea" name="content"
                                  placeholder="content"
                                  value={this.state.content}
                                  onChange={this.handleChange.bind(this)}/>
                    <button className="btn btn-default btn-sm custom-btn-default" onClick={this.handleClick.bind(this)}>글 쓰기</button>
                </div>
        )
    }

    handleChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClick(){
        let title = this.state.title;
        let content = this.state.content;
        this.insertPost(title, content);
        this.setState({
            title:"",
            content:""
        });
    }

    insertPost(title, content) {
        axios.post("http://localhost:3000/post/",{
            title: title,
            content: content
        }).then(response => this.setState({ redirectToNewPage: true }));

    }

}

export default PostCreate