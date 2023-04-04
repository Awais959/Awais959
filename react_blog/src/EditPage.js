import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
 
const EditPost = ({
     posts, handleEdit, editTitle, editBody, setEditTitle, setEditBody
    }) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
        if (post) {
            setEditBody(post.title);
            setEditTitle(post.body);
        }
    }, [post, setEditBody, setEditTitle]);

  return (
    <main className="NewPost">
   {editTitle &&
        <>
            <h2>Edit Post</h2>
            <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="editTitle">Title</label>
                <input 
                    id="postTitle"
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <label html="edittBody">Post</label>
                <textarea
                    id="posttBody"
                    required
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                />
                <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
            </form>
        </>}
         {!editTitle && 
            <>
                <h2>Post Not Found</h2>
                <p>Well, that's disappointing.</p>                
                <p>
                    <Link to="/">Visit Our Homepage</Link> 
                </p>
            </>

      }
    </main>
)
}

export default EditPost;