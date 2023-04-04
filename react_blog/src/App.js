import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPost from './EditPage';
import { Route, Switch, useHistory} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';
import DataContext from './context/DataContext';

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const history = useHistory();
  const { width } = useWindowSize();
  
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
  
  useEffect(() => {
    // const fetchPosts = async () => {
    //   try {
    //     const response = await api.get('/posts');
    //     setPosts(response.data);
    //   } catch (err) {
    //     if (err.response) {
    //       console.log(err.response.data);
    //       console.log(err.response.status);
    //       console.log(err.response.hearders);
    //     } else {
    //       console.log(`Error: ${err.meassage}`);
    //     }    
    //   }
    // }
    
    // fetchPosts()
    setPosts(data)
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(post =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase().includes(search.toLowerCase())));

      setSearchResults(filteredResults.reverse());
  },[posts, search])

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp' );
    const updatedPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? {...response.data} : post));
      setEditTitle('');
      setEditBody('');
      history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  const handleDelete = async (id) => {
    // const postsList = posts.filter(post => post.id !== id);
    // setPosts(postsList);
    // history.push('/');
    try {
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      history.push('/');
    } catch (err) {
      console.log(`Error: ${err.meassage}`)
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    // const datetime = format(new Date(), 'MMMM dd, yyyy pp' );
    // const newPost = { id, title: postTitle, datetime, body: postBody };
    // const allPosts = [...posts, newPost];
    // setPosts(allPosts);
    // setPostTitle('');
    // setPostBody('');
    // history.push('/');

    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp' );
    const newPost = { id, title: postTitle, datetime, body: postBody };
   try {
    const response = await api.post('/posts', newPost)
    const allPosts = [...posts, response.data];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    history.push('/');
    console.log(response.data)
   } catch (err) {
    console.log(`Error: ${err.meassage}`)
   }  
  }

  return (
    <div className="App">
      <Header title="React JS Blog" width={width} />
      <Nav search={search} setSearch={setSearch}/>
        <Switch>
          <Route exact path="/"> 
            <Home posts={searchResults}
              fetchError={fetchError}
              isLoading={isLoading}
            />
          </Route>
          <Route exact path="/post">
           <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              postBody={postBody}
              setPostTitle={setPostTitle}
              setPostBody={setPostBody}
           />
          </Route>
          <Route path="/edit/:id">
           <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              editBody={editBody}
              setEditTitle={setEditTitle}
              setEditBody={setEditBody}
           />
          </Route>
          <Route path="/post/:id">
            <PostPage posts={posts} handleDelete={handleDelete}/>
          </Route>
          <Route path="/about" component={About}/>
          <Route path="*" component={Missing} />
        </Switch>
      <Footer />
    </div>
  );
}
 
export default App;
