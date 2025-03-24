// fetch("./data.json")
//         .then((response) => response.json())
//         .then((data) => console.log(data))
//         .catch(error => console.log(error));
//sets up storage, scruffy, will move most of this to a separate json file at some point
function initialiseSessionStorage() {
    fetch("data.json")
        .then(function (response) { return response.json(); })
        .then(function (data) {
        sessionStorage.setItem("difficulties", JSON.stringify(data));
    });
    var amateur = [4, 7, 2, 1, 2, 1, 0, 2, 1, 3, 2, 0, 5, 2, 3, 3, 6, 3, 4, 1, 1, 1, 1, 1];
    var intermediate = [4, 6, 1, 1, 2, 1, 0, 2, 1, 3, 1, 1, 4, 1, 3, 3, 3, 2, 3, 1, 1, 1, 1, 1];
    var professional = [4, 5, 0, 1, 2, 1, 0, 2, 0, 2, 0, 1, 3, 0, 3, 3, 0, 1, 2, 1, 1, 1, 1, 1];
    var nightmare = [4, 4, 0, 1, 2, 1, 0, 2, 0, 1, 0, 2, 2, 0, 2, 2, 0, 0, 1, 0, 0, 1, 0, 1];
    var insanity = [3, 3, 0, 1, 2, 1, 0, 2, 0, 0, 0, 2, 2, 0, 2, 1, 0, 0, 1, 0, 0, 1, 0, 0];
    var nameMap = ["Starting sanity:", "Sanity pill %:", "Sanity drain speed:", "Sprinting:",
        "Player speed:", "Flashlights:", "Lose items:", "Ghost speed:", "Ghost roam freq:", "Room change chance:",
        "Interaction amount:", "Event freq:", "Hunt grace period:", "Hunt duration:", "Kills extend hunts:",
        "Evidence:", "Setup time:", "Doors open:", "Hiding spots:", "Sanity monitor:", "Activity monitor:",
        "Fusebox:", "Fusebox visible:", "Cursed objects:"];
    var maps = [["6 Tanglewood Drive", "images/tangle_image.png"], ["10 Ridgeview Court", "images/ridgeview_image.png"], ["13 Willow Street", "images/willow_image.png"],
        ["42 Edgefield Road", "images/edgefield_image.png"], ["Bleasdale Farmhouse", "images/bleasdale_image.png"], ["Camp Woodwind", "images/woodwind_image.png"], ["Grafton Farmhouse", "images/grafton_image.png"],
        ["Sunny Meadows (Restricted)", "images/meadows_restricted_image.png"], ["Brownstone High School", "images/brownstone_image.png"], ["Maple Lodge Campsite", "images/maple_image.png"], ["Prison", "images/prison_image.png"], ["Sunny Meadows", "images/meadows_image.png"], ["Point Hope", "images/point_hope_image.png"]];
    var currentDifficulty = [4, 4, 0, 1, 2, 1, 0, 2, 0, 1, 0, 2, 2, 0, 2, 2, 0, 0, 1, 0, 0, 1, 0, 1];
    sessionStorage.setItem("amateur", JSON.stringify(amateur));
    sessionStorage.setItem("intermediate", JSON.stringify(intermediate));
    sessionStorage.setItem("professional", JSON.stringify(professional));
    sessionStorage.setItem("nightmare", JSON.stringify(nightmare));
    sessionStorage.setItem("insanity", JSON.stringify(insanity));
    sessionStorage.setItem("currentDifficulty", JSON.stringify(currentDifficulty));
    sessionStorage.setItem("nameMap", JSON.stringify(nameMap));
    sessionStorage.setItem("maps", JSON.stringify(maps));
    sessionStorage.setItem("buttonValues", JSON.stringify([]));
    generateNewOptions();
}
function getMapNameFromIndex(index) {
    var mapNames = JSON.parse(sessionStorage.getItem("maps"));
    return mapNames[index][0];
}
// chooses 3 difficulty settings and displays them on the difficulty buttons, updates buttonValues with the new selection
function generateNewOptions() {
    var choiceArray = createListOfNonMax();
    var difficultyNames = JSON.parse(sessionStorage.getItem("nameMap"));
    var currentDifficulty = JSON.parse(sessionStorage.getItem("currentDifficulty"));
    var difficulties = JSON.parse(sessionStorage.getItem("difficulties"));
    var newButtonValues = [];
    for (var i = 1; i < 4; i++) {
        var temp = Math.floor(Math.random() * choiceArray.length);
        if (choiceArray[temp] == undefined) {
            document.getElementById("option".concat(i)).style.visibility = "hidden";
        }
        else {
            document.getElementById("option".concat(i)).textContent = "".concat(difficultyNames[choiceArray[temp]], " ").concat(difficulties[choiceArray[temp]][currentDifficulty[choiceArray[temp]] - 1]);
            document.getElementById("option".concat(i)).style.visibility = "visible";
            newButtonValues.push(choiceArray[temp]);
            choiceArray.splice(temp, 1);
        }
    }
    var mapList = JSON.parse(sessionStorage.getItem("maps"));
    var mapChoice = [];
    for (var i = 0; i < 2; i++) {
        mapChoice[i] = Math.floor(Math.random() * mapList.length);
        if (mapChoice[i] != mapChoice[i - 1]) {
            var mapImage = document.getElementById("map".concat(i));
            console.log(mapList[mapChoice[i]][1]);
            console.log(mapList[mapChoice[i]][0]);
            mapImage.src = mapList[mapChoice[i]][1];
        }
        else {
            i--;
        }
    }
    document.getElementById("test").textContent = "".concat(getMapNameFromIndex(mapChoice[0]), " OR ").concat(getMapNameFromIndex(mapChoice[1]));
    sessionStorage.setItem("buttonValues", JSON.stringify(newButtonValues));
}
//rebuilds the array of non-maxxed difficulties, elements being indexes from the full difficulty list
function createListOfNonMax() {
    var currentDifficulty = [];
    currentDifficulty = JSON.parse(sessionStorage.getItem("currentDifficulty"));
    var listOfNonMax = [];
    for (var i = 0; i < 24; i++) {
        if (currentDifficulty[i] > 0) {
            listOfNonMax.push(i);
        }
    }
    return listOfNonMax;
}
function selectDifficulty() {
    var value = document.getElementById("difficulty").value;
    switch (value) {
        case "amateur":
            sessionStorage.setItem("currentDifficulty", sessionStorage.getItem("amateur"));
            break;
        case "intermediate":
            sessionStorage.setItem("currentDifficulty", sessionStorage.getItem("intermediate"));
            break;
        case "professional":
            sessionStorage.setItem("currentDifficulty", sessionStorage.getItem("professional"));
            break;
        case "nightmare":
            sessionStorage.setItem("currentDifficulty", sessionStorage.getItem("nightmare"));
            break;
        case "insanity":
            sessionStorage.setItem("currentDifficulty", sessionStorage.getItem("insanity"));
            break;
        case "saved":
            sessionStorage.setItem("currentDifficulty", sessionStorage.getItem("saved"));
            break;
        default:
            sessionStorage.setItem("currentDifficulty", sessionStorage.getItem("nightmare"));
    }
    document.getElementById("counter").innerHTML = "0";
    refreshSidebar();
    generateNewOptions();
}
//deletes and recreates the sidebar to reflect difficulty changes
function refreshSidebar() {
    var currentDifficulty = JSON.parse(sessionStorage.getItem("currentDifficulty"));
    var nameMap = JSON.parse(sessionStorage.getItem("nameMap"));
    var difficultyNames = JSON.parse(sessionStorage.getItem("difficulties"));
    var diff = "";
    document.getElementById("sidebar-text").innerHTML = "";
    for (var i = 0; i < 24; i++) {
        diff = "<p>".concat(nameMap[i], " ").concat(difficultyNames[i][currentDifficulty[i]], "</p>");
        document.getElementById("sidebar-text").insertAdjacentHTML('beforeend', diff);
    }
}
//triggers the difficulty change and reloads the buttons for the next round
function choiceMade(choice) {
    var currentDifficulty = JSON.parse(sessionStorage.getItem("currentDifficulty"));
    var choices = JSON.parse(sessionStorage.getItem("buttonValues"));
    currentDifficulty[choices[choice]] -= 1;
    sessionStorage.setItem("currentDifficulty", JSON.stringify(currentDifficulty));
    generateNewOptions();
    refreshSidebar();
    var count = +document.getElementById("counter").innerHTML;
    count += 1;
    document.getElementById("counter").innerHTML = "".concat(count);
}
