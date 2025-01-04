$Event(0, Default, function() {
    // [Veteran] NG+ speffect
    InitializeEvent(0, 1040641001, 0);
    // [Veteran] Aggro finger
    InitializeEvent(0, 1040641002, 0);
});

// [Veteran] NG+ talisman speffect
$Event(1040641001, Restart, function() {
    // Clearcount state was modified
    if(EventFlag(1040644010)) {
        WaitFor(!CharacterHasSpEffect(10000, 42000010));
        
        if (EventFlag(1040644018)) {
            SetSpEffect(10000, 42000018);   // NG+8
        } else if (EventFlag(1040644017)) {
            SetSpEffect(10000, 42000017);   // NG+7
        } else if (EventFlag(1040644016)) {
            SetSpEffect(10000, 42000016);   // NG+6
        } else if (EventFlag(1040644015)) {
            SetSpEffect(10000, 42000015);   // NG+5
        } else if (EventFlag(1040644014)) {
            SetSpEffect(10000, 42000014);   // NG+4
        } else if (EventFlag(1040644013)) {
            SetSpEffect(10000, 42000013);   // NG+3
        } else if (EventFlag(1040644012)) {
            SetSpEffect(10000, 42000012);   // NG+2
        } else if (EventFlag(1040644011)) {
            SetSpEffect(10000, 42000011);   // NG+1
        } else {
            SetSpEffect(10000, 42000020);   // NG
        }
        
        SetEventFlagID(1040644010, OFF);
        WaitFixedTimeFrames(1);
        RestartEvent();
    }
    // Clearcount state NOT modified
    else {
        WaitFor(CharacterHasSpEffect(10000, 42000010));
        BatchSetEventFlags(1040644011, 1040644018, OFF);
        
        if (GameCycle() == 0) {
            RestartEvent();
        } else if (GameCycle() == 1) {
            SetEventFlagID(1040644011, ON);
        } else if (GameCycle() == 2) {
            SetEventFlagID(1040644012, ON);
        } else if (GameCycle() == 3) {
            SetEventFlagID(1040644013, ON);
        } else if (GameCycle() == 4) {
            SetEventFlagID(1040644014, ON);
        } else if (GameCycle() == 5) {
            SetEventFlagID(1040644015, ON);
        } else if (GameCycle() == 6) {
            SetEventFlagID(1040644016, ON);
        } else if (GameCycle() == 7) {
            SetEventFlagID(1040644017, ON);
        } else {
            SetEventFlagID(1040644018, ON);
        }
        
        SetSpEffect(10000, 42000020);   // Revert to NG
        SetEventFlagID(1040644010, ON);
        WaitFixedTimeFrames(1);
        RestartEvent();
    }
});

// [Veteran] Aggro finger change team type
$Event(1040641002, Restart, function() {
    if(PlayerHasItem(ItemType.Goods, 42010)) {
        // Diventa spettro
        WaitFor(CharacterHasSpEffect(10000, 42000));
        ClearSpEffect(10000, 42000);
        WaitFixedTimeSeconds(1);
        SetCharacterTeamType(10000, TeamType.Disabled);
        SpawnOneshotSFX(TargetEntityType.Character, 10000, 220, 302702);
        SetSpEffect(10000, 18696);
        
        // Reset
        WaitFor(CharacterHasSpEffect(10000, 42000));
        ClearSpEffect(10000, 42000);
        WaitFixedTimeSeconds(1);
        SetCharacterTeamType(10000, TeamType.Human);
        SpawnOneshotSFX(TargetEntityType.Character, 10000, 220, 302061);
        ClearSpEffect(10000, 18696);
        RestartEvent();
    }
    else {
        WaitFixedTimeFrames(1);
        RestartEvent();
    }
});
