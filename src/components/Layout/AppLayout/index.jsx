import React, { useState, useEffect } from "react";
import styles from "./AppLayout.module.css";
import MainContent from "../Main";

export default function AppLayout({
  children,
  className = "",
  header,
  footer,
  sidebar,
  sidebarPosition = "left", // left, right
  sidebarCollapsed = false,
  onToggleSidebar,
  hideHeaderOnScroll = false,
  ...restProps
}) {
  const [isCollapsed, setIsCollapsed] = useState(sidebarCollapsed);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle sidebar toggle
  const handleToggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);

    // Call the provided callback if it exists
    if (onToggleSidebar) {
      onToggleSidebar(newCollapsedState);
    }
  };

  // Handle mobile sidebar toggle
  const handleMobileToggle = () => {
    const newOpenState = !isMobileOpen;
    setIsMobileOpen(newOpenState);

    // Call the provided callback if it exists
    if (onToggleSidebar) {
      onToggleSidebar(newOpenState);
    }
  };

  // Handle scroll events for hiding header
  useEffect(() => {
    if (!hideHeaderOnScroll) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hideHeaderOnScroll, lastScrollY]);

  return (
    <div
      className={`
        ${styles.appLayout}
        ${sidebar ? styles.withSidebar : ""}
        ${
          sidebarPosition === "right" ? styles.sidebarRight : styles.sidebarLeft
        }
        ${isCollapsed ? styles.sidebarCollapsed : ""}
        ${isMobileOpen ? styles.sidebarOpen : ""}
        ${isScrollingDown ? styles.scrollingDown : ""}
        ${hideHeaderOnScroll ? styles.hideHeaderOnScroll : ""}
        ${className}
      `}
      {...restProps}
    >
      {header && (
        <header className={styles.header}>
          <div className={styles.headerContent}>{header}</div>
          {sidebar && (
            <button
              className={styles.mobileToggle}
              onClick={handleMobileToggle}
              aria-label="Toggle sidebar"
            >
              <span className={styles.hamburger}></span>
            </button>
          )}
        </header>
      )}

      <div className={styles.contentWrapper}>
        {sidebar && (
          <aside className={styles.sidebar}>
            <div className={styles.sidebarContent}>{sidebar}</div>
            <button
              className={styles.sidebarToggle}
              onClick={handleToggleSidebar}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <div className={styles.openedArrow}>›</div>
              ) : (
                <div className={styles.closedArrow}>‹</div>
              )}
            </button>
          </aside>
        )}

        <MainContent className="main-content">{children}</MainContent>
      </div>

      {footer && <footer className={styles.footer}>{footer}</footer>}
    </div>
  );
}
