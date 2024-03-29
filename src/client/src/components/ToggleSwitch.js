const ToggleSwitch = ({ selected, toggleSelected }) => {
    return (
        <div className="toggle-container" onClick={toggleSelected}>
            
            <div className={`dialog-button ${selected ? "" : "disabled"}`}>
                {selected ? "⠀" : "⠀"}
            </div>
        </div>
    );
};

export default ToggleSwitch;
