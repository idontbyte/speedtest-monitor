var runNumber = 1
var run = []
var downloads = []
var uploads = []
var pings = []
var chartColors = []
var chartDownloads;
var chartUploads;
var chartPings;

function acceptData(download, upload, ping) {
    downloads.push(download)
    uploads.push(upload)
    pings.push(ping)
    run.push(`Run ${runNumber}`)
    chartColors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`)
    createDownloadsChart();
    createUploadsChart();
    createPingsChart();
    runNumber++
}

function createDownloadsChart() {
    const ctx = document.getElementById('chartDownloads').getContext('2d');
    if (typeof(chartDownloads) !== 'undefined') {
        chartDownloads.destroy();
    }
    chartDownloads = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: run,
            datasets: [{
                label: 'Download speeds',
                data: downloads,
                backgroundColor: chartColors,
                borderColor: chartColors,
                borderWidth: 1
            }]
        },

        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createUploadsChart() {
    const ctx = document.getElementById('chartUploads').getContext('2d');
    if (typeof(chartUploads) !== 'undefined') {
        chartUploads.destroy();
    }
    chartUploads = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: run,
            datasets: [{
                label: 'Upload speeds',
                data: uploads,
                backgroundColor: chartColors,
                borderColor: chartColors,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createPingsChart() {
    const ctx = document.getElementById('chartPings').getContext('2d');
    if (typeof(chartPings) !== 'undefined') {
        chartPings.destroy();
    }
    chartPings = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: run,
            datasets: [{
                label: 'Ping timings',
                data: pings,
                backgroundColor: chartColors,
                borderColor: chartColors,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}