import { EventEmitter } from 'events';

const evtEmitter = new EventEmitter();
const lfn1 = data => console.log('lfn>>', data);
evtEmitter.addListener('evt1', (...args) => console.log('evt1 >> ', args));

evtEmitter.on('evt1', lfn1);
evtEmitter.on('evt1', data => 
   console.log('evt1--->>>', data));

evtEmitter.on('evt2', data => 
   console.log('evt2--->>>', data));

evtEmitter.emit('evt1', '111');
evtEmitter.emit('evt1', '111-2');
evtEmitter.emit('evt2', '222');

evtEmitter.removeListener('evt1', lfn1);
