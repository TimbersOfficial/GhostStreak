

// fetch("./data.json")
//         .then((response) => response.json())
//         .then((data) => console.log(data))
//         .catch(error => console.log(error));



//sets up storage, scruffy, will move most of this to a separate json file at some point
function initialiseSessionStorage()
{
    fetch("data.json")
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem("difficulties", JSON.stringify(data))})

    const amateur: number[] = [4,7,2,1,2,1,0,2,1,3,2,0,5,2,3,3,6,3,4,1,1,1,1,1];
    const intermediate: number[] = [4,6,1,1,2,1,0,2,1,3,1,1,4,1,3,3,3,2,3,1,1,1,1,1];
    const professional: number[] = [4,5,0,1,2,1,0,2,0,2,0,1,3,0,3,3,0,1,2,1,1,1,1,1];
    const nightmare: number[] = [4,4,0,1,2,1,0,2,0,1,0,2,2,0,2,2,0,0,1,0,0,1,0,1];
    const insanity: number[] = [3,3,0,1,2,1,0,2,0,0,0,2,2,0,2,1,0,0,1,0,0,1,0,0];
    const nameMap: string[] = ["Starting sanity:","Sanity pill %:","Sanity drain speed:","Sprinting:",
        "Player speed:","Flashlights:","Lose items:","Ghost speed:", "Ghost roam freq:", "Room change chance:",
        "Interaction amount:","Event freq:","Hunt grace period:","Hunt duration:","Kills extend hunts:",
        "Evidence:","Setup time:","Doors open:","Hiding spots:","Sanity monitor:","Activity monitor:",
        "Fusebox:","Fusebox visible:","Cursed objects:"]
    const maps: string[][] = [["6 Tanglewood Drive","images/tangle_image.png"],["10 Ridgeview Court","images/ridgeview_image.png"],["13 Willow Street","images/willow_image.png"],
        ["42 Edgefield Road","images/edgefield_image.png"],["Bleasdale Farmhouse","images/bleasdale_image.png"],["Camp Woodwind","images/woodwind_image.png"],["Grafton Farmhouse","images/grafton_image.png"],
        ["Sunny Meadows (Restricted)","images/meadows_restricted_image.png"],["Brownstone High School","images/brownstone_image.png"],["Maple Lodge Campsite","images/maple_image.png"],["Prison","images/prison_image.png"],["Sunny Meadows","images/meadows_image.png"],["Point Hope","images/point_hope_image.png"]];
    let currentDifficulty: number[] = [4,4,0,1,2,1,0,2,0,1,0,2,2,0,2,2,0,0,1,0,0,1,0,1];
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

function getMapNameFromIndex(index: number)
{
    let mapNames: string[][] = JSON.parse(sessionStorage.getItem("maps")!);
    return mapNames[index][0];
}

// chooses 3 difficulty settings and displays them on the difficulty buttons, updates buttonValues with the new selection
function generateNewOptions()
{
    let choiceArray: number[] = createListOfNonMax();
    let difficultyNames: string[] = JSON.parse(sessionStorage.getItem("nameMap")!);
    let currentDifficulty: number[] = JSON.parse(sessionStorage.getItem("currentDifficulty")!);
    let difficulties: string[][] = JSON.parse(sessionStorage.getItem("difficulties")!);
    let newButtonValues: number[] = []
    for (let i = 1; i < 4; i++)
    {
        let temp: number = Math.floor(Math.random()*choiceArray.length)
        
        if (choiceArray[temp] == undefined)
        {
            document.getElementById(`option${i}`)!.style.visibility = "hidden";
        }
        else
        {
            document.getElementById(`option${i}`)!.textContent = `${difficultyNames[choiceArray[temp]]} ${difficulties[choiceArray[temp]][currentDifficulty[choiceArray[temp]] - 1]}`;
            document.getElementById(`option${i}`)!.style.visibility = "visible";
            newButtonValues.push(choiceArray[temp]);
            choiceArray.splice(temp,1); 
        }
        
    }
    let mapList: string[] = JSON.parse(sessionStorage.getItem("maps")!);
    let mapChoice: number[] = []
    for (let i = 0; i < 2; i++)
    {
        mapChoice[i] = Math.floor(Math.random()*mapList.length);
        if (mapChoice[i] != mapChoice[i-1])
        {
            let mapImage = document.getElementById(`map${i}`) as HTMLImageElement;
            console.log(mapList[mapChoice[i]][1]);
            console.log(mapList[mapChoice[i]][0]);
            mapImage.src = mapList[mapChoice[i]][1];
        }
        else
        {
            i--;
        }
    }
    document.getElementById("test")!.textContent = `${getMapNameFromIndex(mapChoice[0])} OR ${getMapNameFromIndex(mapChoice[1])}`;
    sessionStorage.setItem("buttonValues", JSON.stringify(newButtonValues));
}

//rebuilds the array of non-maxxed difficulties, elements being indexes from the full difficulty list
function createListOfNonMax()
{
    let currentDifficulty: number[] = [];
    currentDifficulty = JSON.parse(sessionStorage.getItem("currentDifficulty")!);
    let listOfNonMax: number[] = [];
    for (let i = 0; i < 24; i++)
    {
        if (currentDifficulty[i] > 0)
        {
            listOfNonMax.push(i);
        }
    }
    return listOfNonMax;
}

function selectDifficulty()
{
    let value = (<HTMLSelectElement>document.getElementById("difficulty")).value;
    switch(value)
    {
        case "amateur":
            sessionStorage.setItem("currentDifficulty",sessionStorage.getItem("amateur")!);
            break;

        case "intermediate":
            sessionStorage.setItem("currentDifficulty",sessionStorage.getItem("intermediate")!);
            break;

        case "professional":
            sessionStorage.setItem("currentDifficulty",sessionStorage.getItem("professional")!);
            break;

        case "nightmare":
            sessionStorage.setItem("currentDifficulty",sessionStorage.getItem("nightmare")!);
            break;

        case "insanity":
            sessionStorage.setItem("currentDifficulty",sessionStorage.getItem("insanity")!);
            break;

        case "saved":
            sessionStorage.setItem("currentDifficulty",sessionStorage.getItem("saved")!);
            break;
        default:
            sessionStorage.setItem("currentDifficulty",sessionStorage.getItem("nightmare")!);
    }
    document.getElementById("counter")!.innerHTML = "0";
    refreshSidebar();
    generateNewOptions();
}


//deletes and recreates the sidebar to reflect difficulty changes
function refreshSidebar()
{
    let currentDifficulty: number[] = JSON.parse(sessionStorage.getItem("currentDifficulty")!);
    let nameMap: string[] = JSON.parse(sessionStorage.getItem("nameMap")!);
    let difficultyNames: string[][] = JSON.parse(sessionStorage.getItem("difficulties")!);
    let diff: string = "";
    document.getElementById("sidebar-text")!.innerHTML = "";
    for (let i = 0; i < 24; i++)
    {
        diff = `<p>${nameMap[i]} ${difficultyNames[i][currentDifficulty[i]]}</p>`;
        document.getElementById("sidebar-text")!.insertAdjacentHTML('beforeend', diff);
    }
}

//triggers the difficulty change and reloads the buttons for the next round
function choiceMade(choice)
{
    let currentDifficulty: number[] = JSON.parse(sessionStorage.getItem("currentDifficulty")!);
    let choices: number[] = JSON.parse(sessionStorage.getItem("buttonValues")!);

        currentDifficulty[choices[choice]] -=1;
        sessionStorage.setItem("currentDifficulty", JSON.stringify(currentDifficulty));
    generateNewOptions();
    refreshSidebar();
    let count: number = +document.getElementById("counter")!.innerHTML;
    count+= 1;
    document.getElementById("counter")!.innerHTML = `${count}`;
}