import { router } from "../../router";
import Button from "../../ui/Button";

const handleLogout = () => {
  localStorage.removeItem("authUser");
  router.navigate("/auth/login", { replace: true });
};

const HomePageLayout = () => {
  return (
    <div>
      <Button variant="primary" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
};

export default HomePageLayout;
