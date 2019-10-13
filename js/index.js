function watchForm() {
    /*
    $('#dogForm').on('submit', function (event) {
        event.preventDefault();

        let APIurl = 'https://dog.ceo/api/breeds/image/random';
        let settings = {
            method: "GET"
        };

        fetch(APIurl, settings)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }

                throw new Error("Something went wrong " + response.statusText);
            })
            .then(function (responseJSON) {
                $('#dogImages').append(`<li class="dogItem">
                                    <img src="${responseJSON.message}" />
                                  </li>`);
            })
            .catch(function (err) {
                $('#dogImages').html(`<li>
                                  Something went wrong. Try again later
                                </li>`);
            });
    });
*/
    $('#dogForm').on('submit', function (event) {
        event.preventDefault();

        let dogBreed = $("#breed").val()
        let numberOfImages = $("#numImages").val()
        let APIurl ="https://dog.ceo/api/breed/" + dogBreed + "/images/random/" + numberOfImages;

        $.ajax({
            url: APIurl,
            method: "GET",
            dataType: "json",
            success: function (responseJSON) {
                for (let i = 0; i < responseJSON.message.length; i++) {
                    $('#dogImages').append(`<li class="dogItem"><img src="${responseJSON.message[i]}" /></li>`);
                }
            },
            error: function (err) { 

            }
        })
    });

    // Event delegation
    $('#dogImages').on('click', '.dogItem', function (event) {
        event.preventDefault();

        console.log("Clicked the <li> ");
    })
}

watchForm();