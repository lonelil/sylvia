import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-secondary h-12 min-h-0">
      <Link to={"/"} className="btn btn-ghost normal-case text-xl">
        Sylvia
      </Link>
    </div>
  );
}
