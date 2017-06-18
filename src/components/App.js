import React from 'react';
import axios from 'axios';

import Navigation from './Navigation';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            posts: [],
            selectedPost: null
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
        return (
            <div>
                <Navigation />
                {this.state.posts.map(p => {
                    return (<PostListItem onPostSelect={selectedPost => this.setState({selectedPost})} title={p.title} id={p.id} key={p.id}/>);
                })}
                <PostDetail post={this.state.selectedPost}/>

            </div>
        )
    }
}

class PostListItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            post: null
        }
    }

    getPostDetail(){
        const id = this.props.id;
        const req = axios.get(`http://localhost:3000/post/${id}`);
        req.then(req => this.props.onPostSelect(req.data))
        };

    render() {
        return (
            <li onClick={() => this.getPostDetail()}>{this.props.title}</li>
        );
    }
}

class PostDetail extends React.Component {
    render() {
        if(!this.props.post){
            return <div>Loading...</div>;
        }

        return (
            <div>
                <div>title: {this.props.post.title}</div>
                <div>content: {this.props.post.content}</div>
            </div>
        )
    }
}

export default App;