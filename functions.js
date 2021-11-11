function getMaxColumn(n) {
    return Math.floor((n-3)/6);
}

function getMaxRow(n, column) {
    return Math.floor((n - (3 + 2 * (column - 1)))/(6 + 4 * (column - 1)));
}

function getRowEquivalent(r1, c1, c2) {
    return (r1 + c1 + 2*c1*r1 - c2) / (1+2*c2);
}

function numberOfEvenNumbersBelowAndAt(n) {
  n = parseInt(n);
  // odd
  if (n % 2 != 0) {
    return ((n+1)/2-1);
  }
  // even
  return n/2;
}

function getApproximateNumberOfPrimes(n) {

  var maxColumn = getMaxColumn(n);
  var maxRow = 0;
  var totalNumberOfRows = 0;

  for (let column = 1; column <= maxColumn; ++column) {
    maxRow = getMaxRow(n, column);
    totalNumberOfRows += maxRow;
  }

  var numberOfEvenNumbers = numberOfEvenNumbersBelowAndAt(n);

  totalNumberOfRows = Math.floor(totalNumberOfRows / 2);

  var approxNumberOfPrimes = n - totalNumberOfRows - numberOfEvenNumbers - 1;
  return approxNumberOfPrimes;

}

function markRowsThatHaveDuplicates(n) {

  var maxColumn = getMaxColumn(n);
  var maxRow1 = 0;
  var row2 = 0;
  var expressionDuplicateMap
  for (let column1 = 1; column1 < maxColumn; ++column1) {

    maxRow1 = getMaxRow(n, column1);

    for (let column2 = column1+1; column2 <= maxColumn; ++column2) {

        for (let row1 = 1; row1 <= maxRow1; ++row1) {
          row2 = getRowEquivalent(row1, column1, column2);

          if (Number.isInteger(row2) && row2 > 0) {

            var expression1 = $("#expression-" + row1 + "-" + column1);
            var expression2 = $("#expression-" + row2 + "-" + column2);

            expression1.addClass("duplicate");
            expression2.addClass("duplicate");


          }
        }

    }

  }

}

function getNumberOfOddCompositesAtOrBelowN(n) {

  var maxColumn = getMaxColumn(n);
  var numberOfComposites = 0;

  for (let column = 1; column <= maxColumn; column++) {
    var maxRow = getMaxRow(n, column);
    numberOfComposites += maxRow;
  }

  return numberOfComposites;
}

function getOddCompositeNumber(row, column) {
  var oddCompositeNumber = (3 + 2 * (column - 1)) * (3 + 2 * (row - 1));
  return oddCompositeNumber;
}

function getArrOfOddComposites(n) {

  var arrOfOddComposites = [];

  var maxColumn = getMaxColumn(n);
  var maxRow = 0;

  for (let column = 1; column <= maxColumn; ++column) {
    maxRow = getMaxRow(n, column);
    for (let row = 1; row <= maxRow; ++row) {
      arrOfOddComposites.push(getOddCompositeNumber(row, column));
    }
  }

  arrOfOddComposites = [...new Set(arrOfOddComposites)];

  return arrOfOddComposites;

}

function getArrOfOddNumbersForExpressions(n) {

  var arrOfOddNumbersForExpressions = [];

  var maxColumn = getMaxColumn(n);
  var composite = 0;

  for (let column = 1; column <= maxColumn; column++) {
    arrOfOddNumbersForExpressions.push((1 + 2 * column));
  }

  return arrOfOddNumbersForExpressions;
}

function getMappingForNumberOfExpressionsPerOddComposite(n) {
  var arrOfOddComposites = getArrOfOddComposites(n);
  var arrOfOddForExpressions = getArrOfOddNumbersForExpressions(n);
  var mapping = [];
  for (const leftOddNumber of arrOfOddForExpressions) {
    for (const rightOddNumber of arrOfOddForExpressions) {
      var compositeOddNumber = leftOddNumber * rightOddNumber;
      console.log(compositeOddNumber, leftOddNumber, rightOddNumber);
      if (typeof arrOfOddComposites[compositeOddNumber] !== "undefined") {
        mapping[compositeOddNumber]++;
      } else {
        mapping[compositeOddNumber] = 0;
      }

    };
  };
  return mapping;
}

function getArrOfOddCompositesHTML(n) {
  var arrOfOddComposites = getArrOfOddComposites(n);
  var html = "[";
  for (let oddNumberIndex = 0; oddNumberIndex < arrOfOddComposites.length; ++oddNumberIndex) {

    if (oddNumberIndex != arrOfOddComposites.length - 1) {
      html += arrOfOddComposites[oddNumberIndex] + ",";
    } else {
      html += arrOfOddComposites[oddNumberIndex];
    }

  }
  html += "]";
  return html;
}

function getExpressionHTML(row, column) {
  var leftNumber = 3 + 2 * (column - 1);
  var rightNumber = 3 + 2 * (row - 1);
  return leftNumber + " * " + rightNumber;
}

function getExpressionComposite(row, column) {
  var leftNumber = 3 + 2 * (column - 1);
  var rightNumber = 3 + 2 * (row - 1);
  return leftNumber * rightNumber;
}

function getOddExpressionsHTML(n) {

  var expressionsHTML = "";
  var expressionHTML = "";

  var maxColumn = getMaxColumn(n);
  for (let column = 1; column <= maxColumn; column++) {

    var maxRow = getMaxRow(n, column);
    expressionsHTML += "<div>";
    for (let row = 1; row <= maxRow; ++row) {
      expressionHTML = getExpressionHTML(row, column);
      expressionsHTML += "<div id='expression-" + row + "-" + column + "'>" + expressionHTML + "</div>";
    }
    expressionsHTML += "</div>";

  }

  return expressionsHTML;
}

function getMappingHTML(n) {
    var mapping = getMappingForNumberOfExpressionsPerOddComposite(n);
    console.log(mapping);
    for (const key of mapping) {

    }
}

$(document).ready(function() {

  $("#submit").on("click", function() {

    var n = $("#input-n").val();

    var numberOfComposites = getNumberOfOddCompositesAtOrBelowN(n);
    var oddExpressionsHTML = getOddExpressionsHTML(n);
    var oddCompositesListHTML = getArrOfOddCompositesHTML(n);
    var approxNumberOfPrimes = getApproximateNumberOfPrimes(n);

    $("#number-of-composites").html(numberOfComposites);
    $("#odd-composites-list").html(oddCompositesListHTML);
    $("#odd-expressions").html(oddExpressionsHTML);
    $("#approx-num-of-primes").html(approxNumberOfPrimes);

    markRowsThatHaveDuplicates(n);

    var mappingHTML = getMappingHTML(n);
    $("#odd-expression-count").html(mappingHTML);

  });


});
