import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/common";
import ScanTypes "../types/scans";
import ScansLib "../lib/scans";

mixin (
  accessControlState : AccessControl.AccessControlState,
  scans : Map.Map<Nat, Types.ScanRecord>,
  scanCounter : { var next : Nat },
) {
  public shared ({ caller }) func createScan(input : ScanTypes.ScanInput) : async Types.ScanRecord {
    ignore AccessControl.getUserRole(accessControlState, caller);
    await ScansLib.createScan<system>(scans, scanCounter, input)
  };

  public query ({ caller }) func getScan(id : Nat) : async ?Types.ScanRecord {
    ignore AccessControl.getUserRole(accessControlState, caller);
    ScansLib.getScan(scans, id)
  };

  public query ({ caller }) func listScans() : async [Types.ScanRecord] {
    ignore AccessControl.getUserRole(accessControlState, caller);
    ScansLib.listScans(scans)
  };
};
