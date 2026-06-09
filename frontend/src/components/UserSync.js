import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import API from "../api/axios";

function UserSync() {

  const { user, isLoaded } =
  useUser();

  useEffect(() => {

    const syncUser = async () => {

      if (!isLoaded || !user)
        return;

      try {

        console.log("Syncing User...");

        const response =
          await API.post(
            "/user/sync",
            {
              clerkId: user.id,
              email:
                user.primaryEmailAddress
                  ?.emailAddress,
              firstName:
                user.firstName,
              lastName:
                user.lastName,
              imageUrl:
                user.imageUrl,
            }
          );

        console.log(
          "User Synced:",
          response.data
        );

      } catch (error) {

        console.log(
          "User Sync Error:",
          error.response?.data ||
          error.message
        );

      }

    };

    syncUser();

  }, [user]);

  return null;
}

export default UserSync;