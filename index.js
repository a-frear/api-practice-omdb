const searchURL = `http://www.omdbapi.com/?apikey=`
const apiKEY = "a5f1f287"

function displayResults(responseJson) {
    console.log(responseJson);
    console.log(responseJson.title);
    $('#results-list').empty();
        $('#results-list').append(
            `<li class="movie-list">
            <img src="${responseJson.Poster}" alt="${responseJson.Title} poster" />
            <h3 class="movie-title">${responseJson.Title}</h3>
            <p class="movie-plot">${responseJson.Plot}</p>
            </li>`
        );
    $('#results').removeClass('hidden');
};

function getResults(movie, plotType) {
    const url = searchURL + apiKEY + "&t=" + movie + "&plot=" + plotType;
    console.log(url);

    fetch (url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
};

function watchForm () {
    $('form').submit(event => {
        event.preventDefault();
        const movie = $("#js-movie").val();
        const plotType = $("#js-plot-length").val();
        getResults(movie, plotType);
    });
};
 

$(watchForm);