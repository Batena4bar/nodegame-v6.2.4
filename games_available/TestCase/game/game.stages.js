/**
 * # Stages of the Ultimatum Game
 * Copyright(c) 2020 Stefano Balietti <ste@nodegame.org>
 * MIT Licensed
 *
 * http://www.nodegame.org
 */

module.exports = function(stager, settings) {

    stager
        .next('titlePage')

        // This is where the treatments are administered
        .next('groupTaskWarning')
        
        // A setup to the experiment, this is in the form of a vignette
        .next('background1')
        .next('background2')

        // A test for undertanding of the task (conceptual)
        .next('preTask1')
        .next('preTask2')

        // An explaination of the practical aspect of the task
        .next('video')

        // The task
        .next('taskStartPage')
        .repeat('task', settings.REPEAT)

        // Post-hoc tests
        .next('postTask1')
        .next('postTask2')

        // Finish
        .next('Debrief')
        .next('endgame')
        .gameover();

    // Divide stage 'task' in steps, these are each frame of a single round of the main task.

    stager.extendStage('ultimatum', {
        steps: [
            'initialChoice',
            'guidedCommunication',
            'messageLiking',
            'groupChoice'
        ]
    });

    // Can skip specific stages or steps here.

    // stager.skip('selectLanguage');
    // stager.skip('quiz');
    // stager.skip('instructions');
    // stager.skip('mood');
    // stager.skip('ultimatum');
    // stager.skip('endgame');

    // To skip a specific step:
    // stager.skip('ultimatum', 'responder');
};
