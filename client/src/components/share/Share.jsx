import "./share.css";
import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
export default function Share() {
  const desc = useRef();
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
          <input
            placeholder={"what's in your mind  " + user.username + " ?"}
            ref={desc}
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareimgcontainer">
            <img alt="" className="shareimg" src={URL.createObjectURL(file)} />
            <Cancel
              className="sharecancelimg"
              onClick={() => {
                setFile(null);
              }}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <div className="shareOption">
              <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">Photo or Video</span>
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="shareOptionText"
                />
              </label>
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
