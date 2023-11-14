import React from "react";
import SigninButton from "./SigninButton";

const Header = () => {
    return (
        <header className="flex gap-4 p-4 border-slate-300 border shadow mb-4">
            <SigninButton />
        </header>
    );
};

export default Header;
