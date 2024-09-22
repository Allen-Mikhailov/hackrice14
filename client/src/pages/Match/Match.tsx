import { useEffect } from "react";
import { auth } from "../../modules/firebase";
import { requestMatch } from "../../modules/backend_functions";
import { useState } from "react";
import { UserData } from "server/src/middleware/auth";

function Match() {
  const [name, setName] = useState("...");

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return;
      }

      const res = await requestMatch(user);

      if (!res) {
        setName("Looks like everyone's taken...")
        return;
      }

      setName((res as UserData).display_name);
    })
  }, []);

  return (
    <div>
      <h2>You Matched with:</h2>
      <h1>{name}</h1>
    </div>
  );
}

export default Match;
