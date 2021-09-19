function twoDimensArr(columnAmount, rowAmount, columnStart, rowStart, direction = 'left') {

  const createMatrix = () => {
    let matrix = [];
    let counter = 1;
    for (let i = 0; i < rowAmount; i++) {
      let row = [];
      for (let k = 0; k < columnAmount; k++) {
        row.push(counter);
        counter++;
      }
      matrix.push(row);
    }
    return matrix;
  };

  const fillResultMatrix = (columnStartIndex, rowStartIndex) => {
    let resultMatrix = [];

    let stepsLeft = columnAmount * rowAmount;
    let stepLength = 1;
    let iterToIncreaseStepLength = 2;

    switch (direction) {
      case 'left':
        doStep('left');
      case 'up':
        doStep('up');
      case 'right':
        doStep('right');
      case 'down':
        doStep('down');
    }
    while (stepsLeft > 0) {
      doStep('left');
      doStep('up');
      doStep('right');
      doStep('down');
    }

    function doStep(stepDirection) {
      for (let i = 1; i <= stepLength; i++) {
        let step = stepIfPossible();
        if (stepDirection === 'left') {
          step ? columnStartIndex-- : null;
        } else if (stepDirection === 'up') {
          step ? rowStartIndex-- : null;
        } else if (stepDirection === 'right') {
          step ? columnStartIndex++ : null;
        } else if (stepDirection === 'down') {
          step ? rowStartIndex++ : null;
        }
      }
      updateIterValues();
    }

    function stepIfPossible() {
      if (stepsLeft !== 0) {
        // checking if element out of borders
        if (!(rowStartIndex < 0 || rowStartIndex >= rowAmount || columnStartIndex < 0 || columnStartIndex >= columnAmount)) {
          resultMatrix.push(createMatrix()[rowStartIndex][columnStartIndex]);
          stepsLeft--;
        }
        return true;
      }
      return false;
    }

    function updateIterValues() {
      iterToIncreaseStepLength--;
      if (iterToIncreaseStepLength === 0) {
        iterToIncreaseStepLength = 2;
        stepLength++;
      }
    }

    return resultMatrix;
  };

  return fillResultMatrix(columnStart - 1, rowStart - 1);
}

console.log(twoDimensArr(5,6, 2, 4, 'left'));
