let token = '';
let next = '';
let previous = '';
let pageNumber = 1;

function retrieveResults() {
    let search = $("#video").val()
    let APIkey = "AIzaSyBYjk7OZSZUpWkariquSuMuA__XtiemCsQ";
    let APIurl = "https://www.googleapis.com/youtube/v3/search";

    $('#youtubeResults').empty();
    $('#youtubeResults').append(`<ul id="youtubeVideo"></ul>`);

    $.ajax({
        url: APIurl,
        method: "GET",
        data: {
            'key': APIkey,
            'part': 'id, snippet',
            'q': search,
            'maxResults': '10',
            'relevanceLanguage': 'en',
            'type': 'video',
            'pageToken': token
        },
        dataType: "json",
        success: function (responseJSON) {
            console.log(responseJSON);
            next = responseJSON.nextPageToken;
            previous = responseJSON.prevPageToken;

            for (let i = 0; i < responseJSON.items.length; i++) {
                $('#youtubeVideo').append(`<div class="ytVideo"><a target="_blank" href="https://www.youtube.com/watch?v=${responseJSON.items[i].id.videoId}"><li>${responseJSON.items[i].snippet.title}"</li><img src="${responseJSON.items[i].snippet.thumbnails.medium.url}"></a></div>`)
            }
                if (pageNumber === 1) {
                    $('#youtubeResults').append(`<input type="submit" id="nextButton" value="Next"/>`);
                }
                else {
                    $('#youtubeResults').append(`<input type="submit" id="previousButton" value="Previous"/><input type="submit" id="nextButton" value="Next"/>`);
                }
            firstSearch = false;
        },
        error: function (err) {

        }
    })
}

function search() {
    $('#videoForm').on('submit', function (event) {
        event.preventDefault();
        pageNumber = 1;
        token = "";
        retrieveResults();

    });

    $('#youtubeResults').on('click', '#previousButton', function (event) {
        event.preventDefault();
        token = previous;
        pageNumber--;
        retrieveResults();
    });

    $('#youtubeResults').on('click', '#nextButton', function (event) {
        event.preventDefault();
        token = next;
        pageNumber++;
        retrieveResults();
    });
}

search();