$(document).ready(function() {
  function renderTable(tableId, data) {
    const rows = 8;
    const cols = 10;
    let html = '<thead><tr>';
    for (let c = 0; c < cols; c++) {
      html += '<th>Колонка ' + (c+1) + '</th>';
    }
    html += '</tr></thead><tbody>';
    for (let r = 0; r < rows; r++) {
      html += '<tr>';
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        html += '<td>' + (data[idx] !== undefined ? data[idx] : '') + '</td>';
      }
      html += '</tr>';
    }
    html += '</tbody>';
    $(tableId).html(html);
  }

  function fetchData() {
    return $.get('/data/original');
  }

  function fetchSortedData(order, precision) {
    return $.get('/data/sorted', { order: order, precision: precision });
  }

  $('#loadData').click(function() {
    fetchData().done(function(data) {
      renderTable('#originalTable', data);
      $('#sortedTable').html('');
    });
  });

  $('#sortAsc').click(function() {
    const precision = parseInt($('#precision').val()) || 2;
    fetchSortedData('asc', precision).done(function(data) {
      renderTable('#sortedTable', data);
    });
  });

  $('#sortDesc').click(function() {
    const precision = parseInt($('#precision').val()) || 2;
    fetchSortedData('desc', precision).done(function(data) {
      renderTable('#sortedTable', data);
    });
  });

  // Load data on page load
  $('#loadData').click();
});
