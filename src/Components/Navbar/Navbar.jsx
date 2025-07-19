import React, { useState, useEffect } from "react";
import { Navbar, Button, FormControl } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { family_name, family } from "../../data/family";
import StatsModal from "../StatsModal/StatsModal";

import {
  FaTree,
  FaSearchPlus,
  FaCreditCard,
  FaChartBar,
  FaChevronLeft,
} from "react-icons/fa";

export default function NavbarComponent() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [firstSearch, setFirstSearch] = useState(true); // لتجنب التوجيه التلقائي في البداية

  const navigate = useNavigate();
  const location = useLocation();

  const toggleNavbar = () => setShowNavbar(!showNavbar);
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
    { icon: <FaChartBar />, path: null, action: openStats },
    { icon: <FaCreditCard />, path: "/cards" },
    { icon: <FaSearchPlus />, path: "/focus" },
    { icon: <FaTree />, path: "/" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {showNavbar && (
        <Navbar
          bg="light"
          expand="lg"
          className="px-3 shadow-sm justify-content-between"
        >
          {/* Left: collapse button */}
          <div className="d-flex align-items-center">
            <Button
              onClick={toggleNavbar}
              variant="light"
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "6px 10px",
              }}
            >
              <FaChevronLeft size={16} color="#555" />
            </Button>
          </div>

          {/* Middle: nav icons */}
          <div className="d-flex align-items-center gap-3">
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

          {/* Center: search bar with icon */}
          <div
            className="position-relative"
            style={{ width: "500px", marginRight: "200px" }}
          >
            <FormControl
              dir="rtl"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث..."
              className="rounded-pill pe-5"
              style={{
                borderRadius: "50px",
                paddingRight: "5px",
                paddingBottom: "10px",
              }}
            />
            <FaSearchPlus
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

          {/* Right: family name + tree icon */}
          <div className="d-flex align-items-center gap-2 ms-5 me-5">
            <span className="fw-bold">{family_name.name}</span>
            <FaTree size={20} color="green" />
          </div>
        </Navbar>
      )}

      {!showNavbar && (
        <Button
          variant="success"
          onClick={toggleNavbar}
          className="position-fixed top-0 start-0 m-3 ms-5"
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
