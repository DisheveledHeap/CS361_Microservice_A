document.getElementById("addRow").onclick = function() {
    let classes = ["name", "type", "val"];
    let table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    for (let i = 0; i < 3; i++) {
        let cell = newRow.insertCell(i);
        let input = document.createElement("input");
        input.type = "text";
        input.name = "col" + (i + 1);
        input.setAttribute("class", classes[i]);
        cell.appendChild(input);
    }
}

document.getElementById("randomize").onclick = function() {
    // alert("detected");
    let expense_types = ["Groceries","Housing","Medical","Insurance","Tuition"];

    for (var element of document.getElementsByClassName("type")) {
        // alert("found one");
        element.value = expense_types[Math.floor(Math.random() * expense_types.length)];
    }

    for (var element of document.getElementsByClassName("val")) {
        element.value = Math.floor(Math.random() * 1000);
    }
}

document.getElementById("submit").onclick = function() {
    let vals = [];
    let types = [];

    for (var element of document.getElementsByClassName("type")) {
        types.push(element.value);
    }

    for (var element of document.getElementsByClassName("val")) {
        vals.push(Number(element.value));
    }

    // console.log(vals);
    // console.log(types);

    fetch("http://localhost:3000/pieify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"  // Ensure the server interprets the body as JSON
        },
        body: JSON.stringify({ vals, types })
    }).then(response => response.blob()) // Convert response to a Blob
    .then(blob => {
        const imgUrl = URL.createObjectURL(blob); // Create URL from Blob
        let img = document.getElementById("resultImage");
        img.src = imgUrl; // Set image source
    })
    .catch(error => console.error("Error:", error));
}