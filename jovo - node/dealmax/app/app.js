'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

const config = {
    logging: true,
};

const app = new App(config);


// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
    'LAUNCH': function() {
        this.toIntent('WelcomeIntent');
    },

    'WelcomeIntent': function() {
        this.tell('Welcome to dealmax, How can I help you today?');
    },

    'FindDealIntent': function(area) {
        this.ask('We have a lot of deals in ' + area.value);
    },

    'CheckForDealInIntent': function(place) {
        this.tell('We do have deals for ' + place.value + ', Do you want to hear them?');
    },
});

module.exports.app = app;
