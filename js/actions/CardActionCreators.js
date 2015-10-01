var Dispatcher = require('../dispatcher/dispatcher');
var CardConstants = require('../constants/CardConstants');

var ActionTypes = CardConstants.ActionTypes;

module.exports = {

    dealCard: function(userId) {
        Dispatcher.dispatch({
            type: ActionTypes.DEAL_CARD,
            userId: userId
        });
    }

};