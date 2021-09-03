module.exports = function (stager, settings) {

    //  stager.onGameOver(function() {
    // // Possible actions:
    // // - Store results
    // // - Move clients to another room
    // // - Destroy room
    //  });

    stager
        // Ends
        .stage('end_study')
        .step('examination')
        .step('debrief')
        .step('end_of_game')
        .gameover();

    // Modify the stager to skip one stage.
    // stager.skip('instructions');

    // To skip a step within a stage use:
    // stager.skip('stageName', 'stepName');
    // Notice: here all stages have just one step.
};