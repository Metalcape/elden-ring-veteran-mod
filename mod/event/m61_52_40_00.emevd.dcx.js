$Event(0, Default, function() {
    // NPC
    InitializeEvent(0, 2052400707, 2052400710, 1040649013, 1040640001);
});

// Ghost appears after taking igon's items
$Event(2052400707, Restart, function(X0_4, X4_4, X8_4) {
    DisableNetworkSync();
    EndIf(!PlayerIsInOwnWorld());
    DisableCharacter(X0_4);
    if(!EventFlag(X8_4)) {
        // Wait for itemLot flag
        WaitFor(EventFlag(400712) || EventFlag(400714));
        // Enable NPC
        EnableCharacter(X0_4);
        // Perform animation fade-in
        ForceAnimationPlayback(X0_4, 60502, false, true, false);    // Comparsa spirito (funziona)
        WaitFixedTimeSeconds(1);
        // ForceAnimationPlayback(X0_4, 81100, false, true, false);    // Inizio gesto (non funziona)
        // ForceAnimationPlayback(X0_4, 81101, false, false, false);   // Gesto (funziona)
        // Wait for flag (from ESD)
        WaitFor(EventFlag(X4_4));
        // Fade out animation
        // ForceAnimationPlayback(X0_4, 81102, false, false, false);   // Fine gesto (non funziona)
        WaitFixedTimeSeconds(1);
        ForceAnimationPlayback(X0_4, 60505, false, true, false);    // Scomparsa spirito (funziona)
        WaitFixedTimeSeconds(3);
        DisableCharacter(X0_4);
        SetEventFlagID(X8_4, ON);
    }
});



