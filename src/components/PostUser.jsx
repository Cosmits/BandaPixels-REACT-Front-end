import React from 'react';

const PostUser = (props) => {

  // const [post, setPost] = useState("")

   return (
        <div className="post">
            <div className="post__body">
                <h4 className="post__header">{props.post.id}. {props.post.header}</h4>
                <plaintext>
                    {props.post.content}
                </plaintext>

            </div>
        </div>
    );
};

export default PostUser;