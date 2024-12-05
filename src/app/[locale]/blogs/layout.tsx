import React from "react";

interface BlogLayoutProps {
  children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <div className="overflow-y-scroll overflow-x-hidden">{children}</div>
  );
};

export default BlogLayout;
