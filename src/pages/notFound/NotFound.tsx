import { useNavigate } from "react-router";
import { Button } from "../../ui";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-8">
      <h1>Sorry, the page you were looking for was not found.</h1>
      <Button variant="outlined" onClick={() => navigate("/")} width="200px">
        Return Back
      </Button>
    </div>
  );
}
