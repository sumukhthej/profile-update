import './App.css';
import {ProfileEdit} from "./ProfileEdit";
import {useEffect, useState} from "react";

function App() {
    const [userId, setUserId] = useState(1);
    const userIds = [1,2,3,4]

  return (
      <>
          {userIds.map((id, index) => (
              <button key={index} onClick={(event) => setUserId(id)}>
                  User Id {id}
              </button>
          ))}
          <h2>User Id {userId}</h2>
        <ProfileEdit userId={userId}/>
      </>
  );
}

export default App;
