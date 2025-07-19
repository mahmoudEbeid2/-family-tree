import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { family_name, family } from "../../data/family";
import StatsModal from "../StatsModal/StatsModal";
import { Navbar, Button, FormControl, Container, Nav } from "react-bootstrap";
import {
  FaTree,
  FaSearchPlus,
  FaSearch,
  FaCreditCard,
  FaChartBar,
  FaChevronLeft,
} from "react-icons/fa";
import { BiFullscreen } from "react-icons/bi";
import "./navbar.css";
export default function NavbarComponent({ toggleNavbar, showNavbar }) {
  const [showStats, setShowStats] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [firstSearch, setFirstSearch] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const openStats = () => setShowStats(true);
  const closeStats = () => setShowStats(false);

  useEffect(() => {
    const encodedQuery = encodeURIComponent(searchQuery.trim());

    if (firstSearch) {
      setFirstSearch(false);
      return;
    }

    if (!searchQuery.trim()) return;

    navigate(`/cards?search=${encodedQuery}`, { replace: true });
  }, [searchQuery]);

  const navItems = [
    { icon: <FaTree />, path: "/" },
    { icon: <FaCreditCard />, path: "/cards" },
    { icon: <FaSearchPlus />, path: "/focus" },
    { icon: <FaChartBar />, path: null, action: openStats },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {showNavbar && (
        <Navbar expand="lg" className="shadow-sm px-3" dir="rtl">
          <Container fluid>
            {/* Toggle button for small screens */}
            <Navbar.Toggle aria-controls="navbar-collapse" />

            {/* Family name + tree icon */}
            <Navbar.Brand className="fw-bold d-flex align-items-center gap-2 me-3">
              <FaTree size={20} color="green" />
              <span>{family_name.name}</span>
            </Navbar.Brand>

            {/* Collapsible content */}
            <Navbar.Collapse id="navbar-collapse">
              <Nav
                className="mx-auto   py-2 my-2 my-lg-0 d-flex flex-column flex-lg-row align-items-center justify-content-center w-100"
                style={{ gap: "1rem" }}
              >
                {/* Search input with icon */}
                <div className="position-relative spaces ">
                  <FormControl
                    dir="rtl"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="بحث..."
                    className="rounded-pill pe-5 search-input"
                    style={{
                      paddingRight: "2.2rem",
                      height: "38px",
                    }}
                  />
                  <FaSearch
                    size={16}
                    color="#999"
                    className="position-absolute"
                    style={{
                      top: "50%",
                      right: "12px",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* Navigation Icons */}
                <div
                  className="d-flex justify-content-center flex-wrap"
                  style={{ gap: "0.5rem" }}
                >
                  {navItems.map((item, idx) => (
                    <Button
                      key={idx}
                      variant="link"
                      onClick={() => {
                        if (item.path) navigate(item.path);
                        else item.action?.();
                      }}
                    >
                      {React.cloneElement(item.icon, {
                        size: 20,
                        color: isActive(item.path) ? "green" : "gray",
                      })}
                    </Button>
                  ))}
                </div>
              </Nav>
            </Navbar.Collapse>

            {/* Collapse Navbar button */}
            <Button
              onClick={toggleNavbar}
              variant="light"
              className="d-none d-lg-block ms-2"
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                width: "40px",
                height: "37px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1px 10px",
              }}
            >
              <BiFullscreen size={18} color="#555" />
            </Button>
          </Container>
        </Navbar>
      )}

      {!showNavbar && (
        <Button
          variant="success"
          onClick={toggleNavbar}
          className="position-fixed top-0 start-0 m-3"
        >
          <FaTree size={20} />
        </Button>
      )}

      {/* Stats Modal */}
      {showStats && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
          style={{ backdropFilter: "blur(5px)", zIndex: 1050 }}
        >
          <StatsModal family={family} onClose={closeStats} />
        </div>
      )}
    </>
  );
}
