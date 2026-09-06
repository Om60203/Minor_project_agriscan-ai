import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/common";
import LibraryLib "../lib/library";

mixin (
  accessControlState : AccessControl.AccessControlState,
  library : List.List<Types.DiseaseEntry>,
) {
  public query ({ caller }) func getDiseases() : async [Types.DiseaseEntry] {
    ignore caller;
    LibraryLib.getDiseases(library)
  };

  public query ({ caller }) func getDiseasesByCrop(crop : Text) : async [Types.DiseaseEntry] {
    ignore caller;
    LibraryLib.getDiseasesByCrop(library, crop)
  };

  public query ({ caller }) func searchDiseases(searchTerm : Text) : async [Types.DiseaseEntry] {
    ignore caller;
    LibraryLib.searchDiseases(library, searchTerm)
  };
};
