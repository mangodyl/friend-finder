const friendsData = require("../data/friends");

module.exports = function(app) {
  
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });
  
    app.post("/api/friends", function(req, res) {
        friendsData.push(req.body);

        console.log(`${req.body} <- body
        ${req.body.scores} <- scores
        ${friendsData} <- friends data
        ${friendsData[0].scores[0]}`)



        for (let i = 0; i < friendsData.length; i++) {
            let diffArray = [];
            let bestDiff = 0;
            let bestIndex = 0;
            for (let j = 0; j < 10; j++) {
                let diff = (req.body.scores[j]) - (friendsData[i].scores[j])
                diffArray.push(diff);
                if (j === 9) {
                    const totalDiff = diffArray.reduce((acc, val) => {
                        acc + val;
                    })
                    if (totalDiff > bestDiff) {
                        bestDiff = totalDiff;
                        bestIndex = i;
                    };
                };
            };
            if(i === (friendsData.length - 1)) {
                console.log(friendsData[bestIndex].name);
            }
        };

    });
  };