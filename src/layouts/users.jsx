import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserPage from "../components/page/userPage";
import UsersList from "../components/page/usersListPage";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  return (
    <>
      {userId ? (
        edit ? (
          <EditUserPage />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersList />
      )}
    </>
  );
};

export default Users;
