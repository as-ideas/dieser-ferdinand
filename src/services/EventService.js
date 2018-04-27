import { EventEmitter } from 'fbemitter';

class EventService {
    constructor() {
        this.emitter = new EventEmitter();
        this.emitters = {};
    }

    addListener(eventName, callback) {
        let listener = this.emitter.addListener(eventName, callback);

        this.emitters[eventName] = listener;
    }

    emit(eventName, args) {
        this.emitter.emit(eventName, args);
    }

    remove(eventName) {
        delete this.emitters[eventName];
    }
}

export default new EventService();
