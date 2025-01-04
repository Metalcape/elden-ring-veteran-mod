// [Veteran] modified
$Event(11100030, Restart, function() {
    EndIf(!PlayerIsInOwnWorld());
    WaitFor(PlayerIsInOwnWorld() && EventFlag(3001));
    
    // Handle clearcount talisman
    RemoveItemFromPlayer(ItemType.Ring, 420010, 1);
    WaitFixedTimeFrames(10);
    
    SetEventFlagID(30, ON);
});
