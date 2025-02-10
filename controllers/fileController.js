const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }
    return res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { uploadFile };
