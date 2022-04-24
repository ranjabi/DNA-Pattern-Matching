const HasilTes = (props) => {
    return (
        <div>
            {props.testResult.length > 0 && (
                <p>
                    {props.testResult.at(-1).dates} -{" "}
                    {props.testResult.at(-1).username} -{" "}
                    {props.testResult.at(-1).disease} -{" "}
                    {props.testResult.at(-1).similarity * 100}% -{" "}
                    {props.testResult.at(-1).isinfected === 1 ? 'True' : 'False'}
                </p>
            )}
        </div>
    );
};

export default HasilTes;
