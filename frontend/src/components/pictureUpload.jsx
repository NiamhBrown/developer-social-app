import { useState } from "react";
import { uploadProfilePicture } from "../services/user";
import "../components/EditUser/EditProfileButton.css";

const PictureUpload = () => {
  const token = localStorage.getItem("token");
  const [profilePicture, setProfilePicture] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const data = await uploadProfilePicture(token, profilePicture);
      console.log("Profile picture uploaded:", data);
      console.log("data",data.profilePicture)
      setIsFormVisible(false);

    } catch (err) {
      
      console.error("Error uploading profile picture:", err);
    } 
    

    //window.location.reload();
  };

  return (
    <div>
      <button
        className="editprofilformbutton"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? "Cancel" : "Upload Picture"}
      </button>
      <br />
      {isFormVisible && (
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default PictureUpload;
