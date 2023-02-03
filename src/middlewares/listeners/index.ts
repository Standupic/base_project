import { createListenerMiddleware, isAnyOf, isFulfilled } from '@reduxjs/toolkit';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    type: 'init',
    effect: async (_action, api) => {
        console.log("!")
    },
});

export default listenerMiddleware;
