const AddDisease = () => {
    return (
        <div class="App">
            <h1>Add Disease</h1>
            <label>Nama Penyakit:</label>
            <input type="text" name="disease"/>
            <label>Sequence DNA:</label>
            <button>Upload File</button>
            <button type="submit">Submit</button>
        </div>
    )
}

export default AddDisease;