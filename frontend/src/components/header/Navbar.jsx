import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslate } from "../../translate/LanguageContext";

const Navbar = ({ toggle, setToggle }) => {

  const { user } = useSelector(state => state.auth);
  const translate = useTranslate();
  return (
    <nav style={{ left: toggle && "0" }} className="navbar">
      <ul className="navbar-links">
        {
          !user?.isAdmin && (
            <Link to="/" onClick={() => setToggle(false)} className="navbar-link">
              {translate('home')}
            </Link>
          )
        }

        {
          !user?.isAdmin && (
            <Link
              to="/workshops"
              onClick={() => setToggle(false)}
              className="navbar-link"
            >

              {translate('workshops')}

            </Link>
          )
        }

        {
          user?.role === 'trainer' && (
            <Link
              to="/recipes"
              onClick={() => setToggle(false)}
              className="navbar-link"
            >
              {translate('recipes')}

            </Link>
          )
        }



        {
          user?.role === 'trainer' && (
            <Link
              to="/Auth"
              onClick={() => setToggle(false)}
              className="navbar-link"
            >
              {translate('chat')}

            </Link>
          )
        }

        {
          !user?.isAdmin && (
            <Link
              to="/about"
              onClick={() => setToggle(false)}
              className="navbar-link"
            >

              {translate('about')}

            </Link>
          )
        }



        {
          !user?.isAdmin && (
            <Link
              to="/contact"
              onClick={() => setToggle(false)}
              className="navbar-link"
            >
              {translate('contact')}

            </Link>
          )
        }


        {/* {
          user?.role === 'trainer' && (
            <Link
              to="/addProduct"
              onClick={() => setToggle(false)}
              className="navbar-link"
            >
              {translate('addProduct')}

            </Link>
          )
        } */}

        {
          !user && (
            <Link
              to="/register"
              onClick={() => setToggle(false)}
              className="navbar-link"
            >
              {translate('register')}

            </Link>
          )
        }

        {
          user?.isAdmin && (
            <Link to="/admin-dashboard"
              onClick={() => setToggle(false)}
              className="navbar-link">
              {translate('admin_dashboard')}

            </Link>
          )
        }



        {
          user?.isAdmin && (
            <Link to="/admin-dashboard/users-table"
              onClick={() => setToggle(false)}
              className="navbar-link">
              {translate('users')}

            </Link>
          )
        }
        {
          user?.isAdmin && (
            <Link to="admin-dashboard/posts-table"
              onClick={() => setToggle(false)}
              className="navbar-link">
              {translate('products')}

            </Link>
          )
        }



        {
          user?.isAdmin && (
            <Link to="admin-dashboard/addCategories-table"
              onClick={() => setToggle(false)}
              className="navbar-link">
              {translate('add_category')}

            </Link>
          )
        }
        {
          user?.isAdmin && (
            <Link to="admin-dashboard/categories-table"
              onClick={() => setToggle(false)}
              className="navbar-link">
              {translate('categories')}

            </Link>
          )
        }



        {
          user?.isAdmin && (
            <Link to="admin-dashboard/comments-table"
              onClick={() => setToggle(false)}
              className="navbar-link">
              {translate('workshops')}

            </Link>
          )
        }

        {
          user?.isAdmin && (
            <Link
              to="/posts/create-post"
              onClick={() => setToggle(false)}
              className="navbar-link"
            >
              {translate('create_product')}

            </Link>
          )
        }
        {
          user?.isAdmin && (
            <Link
              to="/admin-dashboard/payments"
              onClick={() => setToggle(false)}
              className="navbar-link"
            >
              {/* {translate('create_product')} */}
              Payments
            </Link>
          )
        }


      </ul>
    </nav>
  );
};

export default Navbar;
