
const download = async (req, res) => {
  try {
    const id = req.query.q;
    const path = `./files/sources/${id}.pdf`;
    res.download(path);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = download;