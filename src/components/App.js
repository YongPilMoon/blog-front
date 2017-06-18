import React from 'react';
import axios from 'axios';

import Navigation from './Navigation';
import PostListItem from './PostListItem';
import PostDetail from './PostDetail';

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

export default App;