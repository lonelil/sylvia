import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar bg-secondary h-12 min-h-0">
      <div className="navbar-start">
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          Sylvia
        </Link>
      </div>
      <div className="navbar-center">
        <div className="form-control">
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              navigate(`/results?search_query=${e.target[0].value}`);
            }}
          >
            <label className="input-group input-group-sm">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered input-sm"
                name="search_query"
                required
              />
              <span>
                <button type="submit" value="Submit">
                  GO
                </button>
              </span>
            </label>
          </form>
        </div>
      </div>
      <div className="navbar-end">
        <a
          className="btn btn-ghost normal-case text-xl"
          href="https://github.com/lonelil/sylvia"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
