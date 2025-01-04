// [Veteran] Blinking message
$Event(90005617, Default, function(X0_4, X4_4) {
    DisableNetworkSync();
    EndIf(!PlayerIsInOwnWorld());
    EndIf(EventFlag(X0_4));
    WaitFor(EventFlag(X0_4));
    WaitFixedTimeSeconds(2);
    DisplayBlinkingMessage(X4_4);
});

// [Veteran] function(bonfire_flag, bonfire_flag, asset_event_id, base_event_flag, event_flags[0-9])
$Event(90005103, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4, X24_4, X28_4, X32_4, X36_4, X40_4, X44_4, X48_4, X52_4, X56_4) {
    if (!EventFlag(9000)) {
        DeleteAssetfollowingSFX(X8_4, false);
        WaitFixedTimeFrames(1);
    }
    DeleteAssetfollowingSFX(X8_4, true);
    EndIf(!PlayerIsInOwnWorld());
    WaitFor(EventFlag(X4_4) && !EventFlag(9000));
    CreateAssetfollowingSFX(X8_4, 100, 6600);
    if (X16_4 == 0) {
        SetEventFlagID(X20_4, ON);
    } else if (X16_4 == 1) {
        SetEventFlagID(X24_4, ON);
    } else if (X16_4 == 2) {
        SetEventFlagID(X28_4, ON);
    } else if (X16_4 == 3) {
        SetEventFlagID(X32_4, ON);
    } else if (X16_4 == 4) {
        SetEventFlagID(X36_4, ON);
    } else if (X16_4 == 5) {
        SetEventFlagID(X40_4, ON);
    } else if (X16_4 == 6) {
        SetEventFlagID(X44_4, ON);
    } else if (X16_4 == 7) {
        SetEventFlagID(X48_4, ON);
    } else if (X16_4 == 8) {
        SetEventFlagID(X52_4, ON);
    } else {
        SetEventFlagID(X56_4, ON);
        Goto(L6);
    }
L6:
    if (PlayerIsInOwnWorld()) {
        if (!EventFlag(69080)) {
            WaitFor(PlayerIsInOwnWorld() && !CharacterHasSpEffect(10000, 100680));
            SetEventFlagID(710510, ON);
            ShowTutorialPopup(1510, true, true);
            DirectlyGivePlayerItem(ItemType.Goods, 9108, 710510, 1);
            SetEventFlagID(69080, ON);
        }
    }
L5:
    EndEvent();
    DeleteAssetfollowingSFX(X8_4, false);
    EndIf(!PlayerIsInOwnWorld());
    if (EventFlag(X0_4)) {
        SetEventFlagID(X20_4, OFF);
        SetEventFlagID(X24_4, OFF);
        SetEventFlagID(X28_4, OFF);
        SetEventFlagID(X32_4, OFF);
        SetEventFlagID(X36_4, OFF);
        SetEventFlagID(X40_4, OFF);
        SetEventFlagID(X44_4, OFF);
        SetEventFlagID(X48_4, OFF);
        SetEventFlagID(X52_4, OFF);
        SetEventFlagID(X56_4, OFF);
        EndEvent();
    }
L3:
    EndIf(EventValue(X12_4, 4) > X16_4);
    WaitFor(EventFlag(X0_4) || (EventFlag(X4_4) && !EventFlag(9000)));
    RestartIf(EventValue(X12_4, 4) > X16_4);
    CreateAssetfollowingSFX(X8_4, 100, 6600);
    if (X16_4 == 0) {
        SetEventFlagID(X20_4, ON);
        EventValueOperation(X12_4, 4, 0, 0, 1, CalculationType.Assign);
    } else {
        SetEventFlagID(X20_4, OFF);
    }
    if (X16_4 == 1) {
        SetEventFlagID(X24_4, ON);
        EventValueOperation(X12_4, 4, 1, 0, 1, CalculationType.Assign);
    } else {
        SetEventFlagID(X24_4, OFF);
    }
    if (X16_4 == 2) {
        SetEventFlagID(X28_4, ON);
        EventValueOperation(X12_4, 4, 2, 0, 1, CalculationType.Assign);
    } else {
        SetEventFlagID(X28_4, OFF);
    }
    if (X16_4 == 3) {
        SetEventFlagID(X32_4, ON);
        EventValueOperation(X12_4, 4, 3, 0, 1, CalculationType.Assign);
    } else {
        SetEventFlagID(X32_4, OFF);
    }
    if (X16_4 == 4) {
        SetEventFlagID(X36_4, ON);
        EventValueOperation(X12_4, 4, 4, 0, 1, CalculationType.Assign);
    } else {
        SetEventFlagID(X36_4, OFF);
    }
    if (X16_4 == 5) {
        SetEventFlagID(X40_4, ON);
        EventValueOperation(X12_4, 4, 5, 0, 1, CalculationType.Assign);
    } else {
        SetEventFlagID(X40_4, OFF);
    }
    if (X16_4 == 6) {
        SetEventFlagID(X40_4, ON);
        EventValueOperation(X12_4, 4, 6, 0, 1, CalculationType.Assign);
    } else {
        SetEventFlagID(X40_4, OFF);
    }
    if (X16_4 == 7) {
        SetEventFlagID(X40_4, ON);
        EventValueOperation(X12_4, 4, 7, 0, 1, CalculationType.Assign);
    } else {
        SetEventFlagID(X40_4, OFF);
    }
    if (X16_4 == 8) {
        SetEventFlagID(X40_4, ON);
        EventValueOperation(X12_4, 4, 8, 0, 1, CalculationType.Assign);
    } else {
        SetEventFlagID(X40_4, OFF);
    }
    if (X16_4 == 9) {
        SetEventFlagID(X40_4, ON);
        EventValueOperation(X12_4, 4, 9, 0, 1, CalculationType.Assign);
    } else {
        SetEventFlagID(X40_4, OFF);
    }
    WaitFor(EventValue(X12_4, 4) != X16_4 || EventFlag(X0_4));
    WaitFixedTimeFrames(1);
    RestartEvent();
});
