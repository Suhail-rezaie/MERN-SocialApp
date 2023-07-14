import "./closeFriend.css";

export default function CloseFriend({ user }) {
  const PF = "http://localhost:3500/images/";

  return (
    <li className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        crossOrigin="anonymous"
        src={PF + user.profilePicture}
        alt=""
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
