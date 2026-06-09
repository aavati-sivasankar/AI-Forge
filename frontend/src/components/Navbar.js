import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  return (
    <div
    className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white"
    style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
    }}
    >
      <h4>AI Forge</h4>

      <UserButton />
    </div>
  );
}

export default Navbar;