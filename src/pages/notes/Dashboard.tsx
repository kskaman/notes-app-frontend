import { useAuth } from "../../context/AuthContext";
import Button from "../../ui/Button";

const HomePageLayout = () => {
  const { logout } = useAuth();

  return (
    <div>
      <Button variant="primary" onClick={logout}>
        Log Out
      </Button>
    </div>
  );
};

export default HomePageLayout;
