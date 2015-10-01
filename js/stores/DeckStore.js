var Dispatcher = require('../dispatcher/dispatcher');
var CardConstants = require('../constants/CardConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = CardConstants.ActionTypes;
const CHANGE_EVENT = 'change';

var users = {};

function DealCard(userId){

    users[userId] = users[userId] || {};

    if(!users[userId].cards)
        users[userId].cards = [];

    users[userId].cards.push([Math.floor(Math.random() * 11) + 1]);
};

var DeckStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getCardsForUser: function(userId){
        return users[userId] ? users[userId].cards : [];
    }

});

DeckStore.dispatchToken = Dispatcher.register(function(action) {

    console.log(arguments);

    switch(action.type) {

        case ActionTypes.DEAL_CARD:
            DealCard(action.userId);
            DeckStore.emitChange();
            break;

        default:
        // do nothing
    }

});

module.exports = DeckStore;