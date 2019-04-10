var Client = require('node-rest-client').Client;
var Trello = require('trello');
const fs = require('fs');
let content = fs.readFileSync('config.json'); 
var sleep = require('system-sleep'); 

let config = JSON.parse(content);
var options_auth = { user: config.rally_user, password: config.rally_password };
var client = new Client(options_auth);
var trello = new Trello(config.trello_key, config.trello_token);
let url = config.url;
let list = config.list;

function postCard(url,listId){
    client.get(url, function (data) {
        let arr = data.QueryResult.Results;
        for (var i = 0; i < 2000 ; i++) {
            if(arr[i] != undefined){
                let id = arr[i]._ref;
                let name = arr[i]._refObjectName;
                sleep(1500);
                trello.addCard(name, id, listId ,function(trelloCard){
                    console.log('Added card:', trelloCard);
                });
            }
        }
    });
}

postCard(url,list);