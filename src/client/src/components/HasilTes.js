const HasilTes = (props) => {
  return (
      <div>
        <p>Hasil Tes</p>
        <p>Tanggal - Pengguna - Penyakit - Similarity - True/False</p>
        {props.testResult.length > 0 &&         <p>
          {props.testResult.at(-1).dates} - {props.testResult.at(-1).username} - {props.testResult.at(-1).disease} -{" "}
          {props.testResult.at(-1).similarity} - {props.testResult.at(-1).isinfected}
        </p> }

      </div>
  )
}

export default HasilTes