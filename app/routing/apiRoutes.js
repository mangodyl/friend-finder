const friendsData = require("../data/friends");

module.exports = function(app) {
  
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });
  
    app.post("/api/friends", function(req, res) {
        // The worst score is 40, hence the 41 inital value
        let bestDiff = 41;
        let bestIndex = 0;

        // Loop through array of friends
        for (let i = 0; i < friendsData.length; i++) {
            let diffArray = [];
            
            // Loop through scores
            for (let j = 0; j < 10; j++) {
                let diff = Math.abs((parseInt(req.body.scores[j])) - (friendsData[i].scores[j]));
                diffArray.push(diff);
                // When last item is pushed, find total
                if (j === 9) {
                    let totalDiff = diffArray.reduce((acc, val) => acc + val);
                    // Compare total to current closest match and replace if closer
                    if (totalDiff < bestDiff) {
                        bestDiff = totalDiff;
                        bestIndex = i;
                    };
                };
            };
            // Once last friend is checked, send best match to survey for modal population
            if(i === (friendsData.length - 1)) {
                res.json(friendsData[bestIndex]);
            };
        };

        // Now that the loop is done we can send the new friend in
        friendsData.push(req.body);
    });
  };