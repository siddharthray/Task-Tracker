import NavBar from "../NavBar";

export default function Header({ onMenuClick }) {
  return (
    <header>
      <NavBar onMenuClick={onMenuClick} />
    </header>
  );
}
