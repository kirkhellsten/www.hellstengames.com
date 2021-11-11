function getEquivalentRows(c1, c2, maxRow) {

  var s;

  var equivalentRows = [];

  // Test to maxRow
  for (let r = 1; r <= maxRow; ++r) {
    s = (r + c1 + 2 * c2 * r - c2) / (1 + 2 * c2);
    if (Number.isInteger(s)) {
      equivalentRows.push([r,s]);
    }
  }

  return equivalentRows;
}

function getEquivalentRowsHTML(equivalentRows) {

  var newHTML = "<div></div>";
  for (const x of xs) {
    console.log(x);
  }

}

$(document).ready(function() {

  $("#submit").on("click", function() {

    var c1 = $("#c1").val();
    var c2 = $("#c2").val();

    var equivalentRows = getEquivalentRows(c1, c2);
    var equivalentRowsHTML = getEquivalentRowsHTML(equivalentRows);

    $("#equivalent-rows-output").html(equivalentRowsHTML);

  });

});
