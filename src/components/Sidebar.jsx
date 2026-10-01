function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    {
      name: "Dashboard",
      icon: "📊",
    },
    {
      name: "Users",
      icon: "👥",
    },
    {
      name: "Settings",
      icon: "⚙️",
    },
  ];

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="logo">

        <div className="logo-icon">
          A
        </div>

        <div>
          <h2>AdminPanel</h2>
          <span>Management</span>
        </div>

      </div>

      {/* Menu */}
      <nav className="sidebar-menu">

        {menuItems.map((item) => (
          <button
            key={item.name}
            className={
              activePage === item.name
                ? "sidebar-link active"
                : "sidebar-link"
            }
            onClick={() =>
              setActivePage(item.name)
            }
          >
            <span>{item.icon}</span>

            {item.name}
          </button>
        ))}

      </nav>

      {/* Admin Profile */}
      <div className="admin-profile">

        <div className="admin-avatar">
          K
        </div>

        <div>
          <strong>Admin</strong>
          <span>Administrator</span>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;