const TestDNA = () => {
    return (
        <div class="App">
            <h1>Test DNA</h1>
            <label>Nama Pengguna:</label>
            <input type="text" name="username"/>
            <label>Sequence DNA:</label>
            <input type="text" name="dna-sequence"/>
            <label>Prediksi Penyakit:</label>
            <input type="text" name="predicted-disease"/>
            <button type="Submit">Submit</button>
            <div>
                <h2>Hasil Tes:</h2>
                <p>Tanggal - Pengguna - Penyakit - True/False</p>
            </div>
        </div>
    )
}

export default TestDNA;