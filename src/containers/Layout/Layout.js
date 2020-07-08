import React from 'react';

const Layout = (props) => {
  return (
    <div className="wrapper">
      <div className="header">
        <div className="title">
          Shoping Cart<span className="red-dot">.</span>
        </div>
      </div>

      <div className="content">
        <div className="container">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
