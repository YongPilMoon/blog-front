import React, {Component} from 'react';
import marked from 'marked';
import {readCookie} from '../helper';
import {Redirect} from 'react-router';
import axios from 'axios';


class PostInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            content: this.props.content,
            introduction: this.props.introduction,
            redirectToDetailPage: false
        }
    }

    handleChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClick(){
        let title = this.state.title;
        let content = this.state.content;
        let introduction = this.state.introduction;
        this.callPostApi(title, content, introduction);
        this.setState({
            title:"",
            centent:"",
            introduction:""
        });
    }

    callPostApi(title, content, introduction){
        const token = readCookie('token');
        console.log(token);
        if(token){
            axios.post(`${this.props.route}`, {
                title: title,
                content: content,
                introduction: introduction
            },{headers: {"x-access-token": token }})
                .then(response => this.setState({redirectToDetailPage: true}));
        }
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

        var rawMarkup = marked(this.state.content, {sanitize: true});

        return {
            __html: rawMarkup
        }
    }

    componentWillMount(){
        const script = document.createElement("script");
        script.src = "/src/js/storage.js";
        script.async = true;
        document.body.appendChild(script);
    }

    openTab(evt, tab){
        const tabcontents = document.getElementsByClassName("tab-pane");
        Array.prototype.forEach.call(tabcontents, (tabcontent) => {
            tabcontent.className = tabcontent.className.replace("active", "");
        });

        const tablinks = document.getElementsByClassName("tab-links");
        Array.prototype.forEach.call(tablinks, (tablink) => {
            tablink.className = tablink.className.replace("active", "");
        });

        evt.currentTarget.className += " active";
        document.getElementById(tab).className += " active";
    }

    render(){
        if (this.state.redirectToDetailPage) {
            // const redirectUrl = `/post/${this.props.post.id}`;
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
                <input type="introduction"
                       name="introduction"
                       placeholder="introduction"
                       className="form-control custom-form-margin"
                       value={this.state.introduction}
                       onChange={this.handleChange.bind(this)}/>
                <div role="tabpanel">
                    <ul id="myTab" className="nav nav-tabs" role="tablist">
                        <li role="presentaion" className="tab-links active" onClick={(evt) => this.openTab(evt, "markdown-wrapper")}>
                            <a href="#" aria-controls="markdown" role="tab">Markdown</a>
                        </li>
                        <li role="presentaion" className="tab-links" onClick={(evt) => this.openTab(evt, "preview-wrapper")}>
                            <a href="#" aria-controls="preview" role="tab">Preview</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id="markdown-wrapper">
                            <textarea name="content" id="markdown" className="markdown"
                                      defaultValue={this.state.content}
                                      onChange={this.handleChange.bind(this)}
                            ></textarea>
                        </div>
                        <div role="tabpanel" className="tab-pane" id="preview-wrapper">
                            <div dangerouslySetInnerHTML={this.rawMarkUp()}></div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-default btn-sm custom-btn-default" onClick={this.handleClick.bind(this)}>글 쓰기</button>
            </div>
        )
    }

}

export default PostInput