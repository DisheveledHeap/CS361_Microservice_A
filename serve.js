const express = require("express");
const app = express();
const cors = require("cors");
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

app.use(cors());
app.use(express.json());

//server recieves post request
app.post("/filter", async (req, res) => 
    {
        // console.log("request recieved");
        // console.log("this is the request body:", req.body);
        
        const { vals, types } = req.body;
        
        let labels = types.toSorted();
        
        for (let i = 1; i < labels.length; i++) {
            if (labels[i] == labels[i - 1]) {
                labels.splice(i,1);
                i--;
            }
        }

        let data = new Array(labels.length).fill(0);
        let colors = labels.map(() => randomColor());

        for (let i = 0; i < vals.length; i++) {
            let index = labels.indexOf(types[i]);


            data[index] += vals[i];
        }

        const configuration = {
            type:"pie",
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors,
                }],
            },
        };
        
        const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 400, height: 400 });
        const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);
    }
);

function randomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

app.listen(3000, () => console.log("Pie chart microservice running on port 3000"));