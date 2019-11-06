var images = [
    'images/cycle/desktop_windows-24px.svg',
    'images/cycle/cake-24px.svg',
    'images/cycle/airline_seat_individual_suite-24px.svg',
    'images/cycle/directions_bike-24px.svg',
    'images/cycle/highlight-24px.svg',
    'images/cycle/sentiment_satisfied_alt-24px.svg',
    'images/cycle/sports_esports-24px.svg',
    'images/cycle/sports_hockey-24px.svg',
    'images/cycle/videogame_asset-24px.svg',
]

/**
 * Loads a json file.
 * @param {String} path Path to the file.
 * @param {(json)=> {}} callback Callback function. 
 */
function loadJSON(path, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.responseType = "json"
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.response);
        }
    };
    xobj.send(null);
}


function cycleImageList(groupname, imageList, location) {
    var template = document.querySelector('#template-cycle-img');

    // Cycle through all the images in the list.
    for (let i = 0; i < imageList.length; i++) {
        const element = imageList[i];
        var clone = document.importNode(template.content, true);

        var input = clone.querySelector("input");
        var label = clone.querySelector("label");
        var img = clone.querySelector("img");

        input.id = groupname + "-img-" + i
        input.name = groupname

        if (i == 0) {
            // The first input should be checked, to begin at the start.
            input.checked = true;
        }
        if (i == imageList.length - 1) {
            // If it is the last element, we want to link it to the first. 
            label.htmlFor = groupname + "-img-" + 0
        } else {
            // Otherwise just link it to the next one.
            label.htmlFor = groupname + "-img-" + (i + 1)
        }
        img.src = element
        location.appendChild(clone)

        // Remove placeholders.
        location.querySelectorAll('.placeholder').forEach(element => {
            location.removeChild(element)
        });
    }
}

function portfolioItem(location, jsonConfig) {
    var template = document.querySelector('#modal-btn-and-modal');
    var clone = document.importNode(template.content, true);

    clone.querySelectorAll('label').forEach(function(element) {
        element.htmlFor = jsonConfig.htmlSpecifics.modalId;
    })
    clone.querySelector("input").id = jsonConfig.htmlSpecifics.modalId;
    clone.querySelector("h1").innerText = jsonConfig.content.title;
    clone.querySelector("p").innerText = jsonConfig.content.content;

    clone.querySelector(".modal-btn-img").src = jsonConfig.button.image;
    clone.querySelector(".modal-img").src = jsonConfig.content.image;

    location.appendChild(clone)
}

window.onload = function() {
    cycleImageList("icon-cycle-1", images, document.querySelector("#cycle-img-wrapper-1"))
    cycleImageList("icon-cycle-2", images, document.querySelector("#cycle-img-wrapper-2"))
    cycleImageList("icon-cycle-3", images, document.querySelector("#cycle-img-wrapper-3"))
    cycleImageList("icon-cycle-4", images, document.querySelector("#cycle-img-wrapper-4"))

    this.loadJSON('js/portfolio-item.json', (response) => {
        response.forEach(element => {
            this.portfolioItem(document.querySelector("#portfolio-items"), element)
        });
    })
}