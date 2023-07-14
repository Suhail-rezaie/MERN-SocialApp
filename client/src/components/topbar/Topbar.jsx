import "./topbar.css";
import { Chat, Notifications, Person, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/?q=${searchQuery}`);
        setSearchResults(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearchResults();
  }, [searchQuery]);

  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" className="link">
          <span className="logo">(SOCIAL-APP)</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          {/* <button onClick={handleSearchQueryChange}>search</button> */}
        </div>
        {
          /* {searchResults.map((result) => (
          <div key={result._id}>{result.name}</div>
        ))} */
          searchResults.name
        }
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" className="link">
            <span className="topbarLink">Homepage</span>
          </Link>
          <span className="topbarLink">Timeline</span>
          <span className="topbarLink" onClick={handleLogout}>
            {user && "Logout"}
          </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`} className="link">
          <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  );
}
