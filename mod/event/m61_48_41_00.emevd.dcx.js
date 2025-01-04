$Event(0, Default, function() {
    // [Veteran] spirit putrid flesh
    // InitializeEvent(0, 2048412560, 61480000, 1040647020, 1040640002);
});

// [Veteran] Aggro finger putrid flesh (disabled)
$Event(2048412560, Restart, function(X0_4, X4_4, X8_4) {
    DisableNetworkSync();
    EndIf(!PlayerIsInOwnWorld());
    WaitFixedTimeFrames(1);
    DisableCharacter(X0_4);
    if (!EventFlag(X8_4)) {
        EnableCharacter(X0_4);
        WaitFor(EventFlag(X4_4));
        ForceCharacterDeath(X0_4, false);
        SetEventFlagID(X8_4, ON);
        WaitFixedTimeSeconds(5);
    }
    RestartEvent();
});
