const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function counterIncrement(date, time, element) {
    let dateValue = new Date(date + ' ' + time + ':00').getTime();

    setInterval(() => {
        var now = new Date().getTime();

        var distance;

        if (dateValue > Date.now()){
            distance = dateValue - now;
        } else{
            distance = now - dateValue;
        }

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var secs = Math.floor((distance % (1000 * 60)) / 1000);

        element.innerHTML =`<p class="center-align card_date_counter">${days}d ${hours}h ${mins}m ${secs}s</p>`
    }, 1000);
}

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

mongoose.model('events', eventSchema);
