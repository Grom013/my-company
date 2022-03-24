import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import { useEffect, useState } from "react";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupLists";
import api from "../../../api";
import UserTable from "../../ui/userTable";
import _ from "lodash";
const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handleBookmark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        } else {
          return user;
        }
      })
    );
  };

  const pageSize = 6;

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);
  const handleProfessionSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    //метод для выбора профессии
    setSelectedProf(item);
  };
  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };
  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };
  if (users) {
    const filteredUsers = searchQuery
      ? users.filter(
          (user) =>
            user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users;
    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };
    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary m-2" onClick={clearFilter}>
              Все профессии
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus count={count} />
          <input
            type="text"
            name="searchQuery"
            placeholder="Search..."
            onChange={handleSearchQuery}
            value={searchQuery}
          />
          {count > 0 && (
            <UserTable
              users={usersCrop}
              selectedSort={sortBy}
              onSort={handleSort}
              onDelete={handleDelete}
              onBookmark={handleBookmark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
};

export default UsersList;
