import Navbar from "./shared/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="tp-main-wrapper bg-white h-screen">
      <Navbar />
      <div className="bg-slate-100 h-10 flex items-center px-8">
        <span>Category</span>
      </div>
      {children}
    </div>
  );
};

export default MainLayout;
