import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const PF = "http://localhost:3500/images/";
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                crossOrigin="anonymous"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "post/1.jpeg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                crossOrigin="anonymous"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/1.jpeg"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
