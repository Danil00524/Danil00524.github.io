const EventEmitter = {
    events: {},
    dispatch: function (event, data) {
        const disptachedEvent = this.events[event];

        if (!disptachedEvent) {
            return;
        }

        disptachedEvent.forEach(cb => cb(data));
    },
    subscribe: function (event, cb) {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(cb);
        return function unsubscribe() {
            this.events[event].splice(this.events[event].indexOf(cb), 1);
        }.bind(this);
    }
};

export default EventEmitter;