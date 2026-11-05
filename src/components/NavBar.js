import { NavLink } from "react-router-dom";

const NavBar = () => {
    const getLinkStyle = ({ isActive }) => {
        return {
            color: isActive ? "blue" : "black",
            textDecoration: isActive ? "underline" : "none"
        };
    };

    return (
        <nav>
            <NavLink to="/" end style={getLinkStyle}>
                Trang chủ
            </NavLink>

            {" | "}

            <NavLink to="/questions" style={getLinkStyle}>
                Ngân hàng câu hỏi
            </NavLink>

            {" | "}

            <NavLink to="/history" style={getLinkStyle}>
                Lịch sử
            </NavLink>
        </nav>
    );
};

export default NavBar;