import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
// import { Users } from "../../dummyData";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const PF = "http://localhost:3500/images/";
  //like checking
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [post.userId, currentUser._id]);

  //fetch user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
      console.log(res.data);
    };
    fetchUser();
  }, [post.userId]);
  console.log(post.img);

  //like handler
  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {
              <Link to={`/profile/${user.username}`}>
                <img
                  className="postProfileImg"
                  crossOrigin="anonymous"
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/1.jpeg"
                  }
                  alt=""
                />
              </Link>
            }
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img
            className="postImg"
            src={PF + post.img}
            crossOrigin="anonymous"
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              crossOrigin="anonymous"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              crossOrigin="anonymous"
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
