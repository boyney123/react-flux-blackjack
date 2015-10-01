'use strict'
var React = require('react');
var DeckStore = require('../stores/DeckStore');
var CardActionCreators = require('../actions/CardActionCreators');

function getStateFromStores(userId) {
    return {
        cards: DeckStore.getCardsForUser(userId)
    };
};

module.exports = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        DeckStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        DeckStore.removeChangeListener(this._onChange);
    },

    render: function(){

        var cards = [];

        this.state.cards.map(function(card){
            cards.push(<p>{card}</p>)
        });

        return (<div>
            <h1>Hello user : {this.props.id}</h1>

            <h2>Total: {this._sumOfCards()}</h2>

            <div>{cards}</div>

            {!this._isBust() && (
                <button onClick={this._requestCard}>Request Card</button>
            )}

            {this._isBust() && (
                <div>
                    <h1>BUST!</h1>
                </div>
            )}
        </div>)
    },

    _requestCard: function(){
        CardActionCreators.dealCard(this.props.id);
    },

    _onChange: function() {
        this.setState(getStateFromStores(this.props.id));
    },

    _sumOfCards: function(){

        var cards = this.state.cards;

        var sum = 0;

        for(var i = 0; i < cards.length; i++){
            sum = sum + parseInt(cards[i]);
        }

        return sum;

    },

    _isBust: function(){
        return this._sumOfCards() > 21;
    }

});