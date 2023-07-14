import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const PF = "http://localhost:3500/images/";
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  // const [followed, setFollowed] = useState(
  //   currentUser.followings.includes(user?._id)
  // );

  const [followed, setFollowed] = useState(
    localStorage.getItem(`${currentUser._id}-followed-${user?._id}`) === "true"
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        console.log(friendList);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();

    if (currentUser.followings.includes(user?._id)) {
      setFollowed(true);
    }
  }, [currentUser, user]);

  // useEffect(() => {
  //   const getFriends = async () => {
  //     try {
  //       const friendList = await axios.get("/users/friends/" + user._id);
  //       console.log(friendList);
  //       setFriends(friendList.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getFriends();
  // }, [user]);

  const handleclick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  //for home right bar
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            className="birthdayImg"
            src={`${PF}gift.png`}
            crossOrigin="anonymous"
            alt=""
          />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img
          className="rightbarAd"
          crossOrigin="anonymous"
          src={`${PF}ad.png`}
          alt=""
        />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  // for profile RightBar
  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarfollowbutton" onClick={handleclick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}

        {user.username === currentUser.username && (
          <button
            className="rightbarfollowbutton"
            // onClick={handleclick}
          >
            Edit Profile
          </button>
        )}

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id} // or key={friend.id}
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  crossOrigin="anonymous"
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "No.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
