exports.getPyramid = (req, res) => {
    const rows = 5;
    const pyramid = [];
    const invertedPyramid = [];


    for (let i = 1; i <= rows; i++) {
        let rowOutput = "";
        for (let k = 1; k <= rows - i; k++) {
            rowOutput += " ";
        }
        for (let j = 1; j <= i; j++) {
            rowOutput += "* ";
        }
        pyramid.push(rowOutput);
    }
    for (let i = rows - 1; i >= 1; i--) {
      let rowOutput = "";
      for (let k = 1; k <= rows - i; k++) {
          rowOutput += " ";
      }
      for (let j = 1; j <= i; j++) {
          rowOutput += "* ";
      }
      invertedPyramid.push(rowOutput);
  }

    
    res.json({
        pyramid: pyramid,
        invertedPyramid: invertedPyramid
        
    });
};
