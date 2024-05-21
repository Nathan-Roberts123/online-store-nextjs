import React from "react";

const TopBar = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-between mb-10">
      <div className="page-title">
        <h3 className="mb-0 text-[28px]">{title}</h3>
        {/*
        <ul className="text-tiny font-medium flex items-center space-x-3 text-text3">
          <li className="breadcrumb-item text-muted">
            <a href="./product-list.html" className="text-hover-primary">
              {" "}
              Home
            </a>
          </li>
          <li className="breadcrumb-item flex items-center">
            <span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
          </li>
          <li className="breadcrumb-item text-muted">Product Grid</li>
        </ul>
  */}
      </div>
    </div>
  );
};

export default TopBar;
