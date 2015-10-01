'use strict'
var React = require('react');

var User = require('../components/user.jsx');

module.exports = React.createClass({

    render: function(){
        return <div>
            <User id="1"></User>
            <User id="2"></User>
        </div>
    }

});