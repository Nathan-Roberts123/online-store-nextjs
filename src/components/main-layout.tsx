import Navbar from "./shared/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="tp-main-wrapper bg-white h-screen mb-4">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
