$Event(0, Default, function() {
    // [Veteran] evento npc
    InitializeEvent(0, 2048450720, 2048450750, 1040649004, 1040640000);
});

// [Veteran]
$Event(2048450720, Restart, function(X0_4, X4_4, X8_4) {
    DisableNetworkSync();
    EndIf(!PlayerIsInOwnWorld());
    WaitFixedTimeFrames(1);
    DisableCharacter(X0_4);
    if (!EventFlag(X8_4)) {
        EnableCharacter(X0_4);
        // Miquella's ring animation
        ForceAnimationPlayback(X0_4, 81101, false, false, false);
        // Wait for disable character flag
        WaitFor(EventFlag(X4_4));
        // End gesture animation
        // ForceAnimationPlayback(X0_4, 81102, false, true, false);
        // WaitFixedTimeFrames(1);
        // Disappearing animation
        // 50570: mimic's veil
        // 60130: phantom disappears standing
        // 60265: disappears without skeleton movement (t-pose)
        // 60470: disappears walking
        // 60505: disappear idle with spirits sounds
        // 60600: custom copy
        // 420000: original fade with spirits sounds
        ForceAnimationPlayback(X0_4, 60505, false, true, false);
        // Set flag to disable character
        WaitFixedTimeSeconds(5);
        SetEventFlagID(X8_4, ON);
    }
    EndEvent();
});
