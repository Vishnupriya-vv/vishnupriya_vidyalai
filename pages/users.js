import React from 'react';
import Footer from '../components/Footer';
import TopNavbar from '../components/Navbar';
import UserList from '../components/UserList';
import useUserData from '../components/hooks/useWindowWidth';

const UserPage = () => {
  const {
    users,
    columnFields,
    handleOnSearch,
    handleSort,
    sortColumn,
    sortDirection
  } = useUserData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopNavbar />
      <div style={{ margin: '60px 0px 20px' }}>
        <UserList
          users={users}
          columnFields={columnFields}
          handleOnSearch={handleOnSearch}
          handleSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;
