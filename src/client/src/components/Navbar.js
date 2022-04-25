import { useState } from "react";

import ToggleSwitch from "./ToggleSwitch";

const Navbar = ({selected, selectedHandler}) => {
    return (
        <div className="bg-secondary h-12 flex justify-end p-2">
            <span className="text-white mr-4 text-lg">Advanced Mode:</span>
            <ToggleSwitch
                selected={selected}
                toggleSelected={() => {
                    selectedHandler(!selected);
                }}
            />
        </div>
    );
};

export default Navbar;
