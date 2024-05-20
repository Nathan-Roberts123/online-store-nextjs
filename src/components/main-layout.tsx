import Navbar from "./shared/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="tp-main-wrapper bg-slate-100 h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
