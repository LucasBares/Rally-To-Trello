var Client = require('node-rest-client').Client;
var options_auth = { user: "user from rally", password: "password from rally" };
var client = new Client(options_auth);
var Trello = require('trello');
var trello = new Trello("trello_key", "trello_token");
 

function postBlocked(){
    client.get("https://rally1.rallydev.com/slm/webservice/v2.0/defect?fetch=Tasks:summary%5BState%2BBlocked%5D]&order=Rank&start=1&pagesize=2000", function (data) {
        let a = data.QueryResult.Results;
        let arr = a;
        for (var i = 0; i < 2000 ; i++) {
            if(arr[i] != undefined){
                let id = arr[i]._ref;
                let name = arr[i]._refObjectName;
                let list = 'list-id from trello';

                trello.addCard(name, id, list ,function(trelloCard){
                    console.log('Added card:', trelloCard);
                });
            }
        }
    });
}

function postReady(){
    client.get("https://rally1.rallydev.com/slm/webservice/v2.0/defect?fetch=Tasks:summary%5BState%2BReady%5D]&order=Rank&start=1&pagesize=2000", function (data) {
        let a = data.QueryResult.Results;
        let arr = a;
        for (var i = 0; i < 2000 ; i++) {
            if(arr[i] != undefined){
                let id = arr[i]._ref;
                let name = arr[i]._refObjectName;
                let list = 'list-id from trello';

                trello.addCard(name, id, list ,function(trelloCard){
                    console.log('Added card:', trelloCard);
                });
            }
        }
    });
}

postBlocked();
postReady();