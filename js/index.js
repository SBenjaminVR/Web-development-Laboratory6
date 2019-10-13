function watchForm() {
    $('#videoForm').on('submit', function (event) {
        event.preventDefault();

        $('#youtubeVideo').empty();

        let search = $("#video").val()
        let APIkey = "AIzaSyBYjk7OZSZUpWkariquSuMuA__XtiemCsQ";
        let APIurl ="https://www.googleapis.com/youtube/v3/search";

        $.ajax({
            url: APIurl,
            method: "GET",
            data: {
                'key': APIkey,
                'part': 'id, snippet',
                'q': search,
                'maxResults': '10',
                'relevanceLanguage': 'en',
                'type': 'video'
            },
            dataType: "json",
            success: function (responseJSON) {
                console.log(responseJSON);
                for (let i = 0; i < responseJSON.items.length; i++) {
                    $('#youtubeVideo').append(`<div class="ytVideo"><a target="_blank" href="https://www.youtube.com/watch?v=${responseJSON.items[i].id.videoId}"><li>${responseJSON.items[i].snippet.title}"</li><img src="${responseJSON.items[i].snippet.thumbnails.medium.url}"></a></div>`)
                }
                $('#youtubeResults').append(`<input type="submit" value="Get more results"/>`);
            },
            error: function (err) { 

            }
        })
    });

    // Event delegation
    /*
    $('#youtubeVideo').on('click', '.ytVideo', function (event) {
        event.preventDefault();
        let youtubeURL = "https://www.youtube.com/watch?v=" + $(this).val();
        console.log($(this));
        console.log(youtubeURL);
        //window.open(youtubeURL, '_blank');
    })
    */
}

watchForm();