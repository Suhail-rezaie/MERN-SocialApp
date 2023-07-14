import "./online.css";

export default function Online({ user }) {
  const PF = "http://localhost:3500/images/";
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          crossOrigin="anonymous"
          src={PF + user.profilePicture}
          alt=""
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
