import List "mo:core/List";
import Types "../types/common";

module {
  public func getDiseases(library : List.List<Types.DiseaseEntry>) : [Types.DiseaseEntry] {
    library.toArray()
  };

  public func getDiseasesByCrop(library : List.List<Types.DiseaseEntry>, crop : Text) : [Types.DiseaseEntry] {
    library.toArray().filter(func d = d.crop == crop)
  };

  public func searchDiseases(library : List.List<Types.DiseaseEntry>, searchTerm : Text) : [Types.DiseaseEntry] {
    let term = searchTerm.toLower();
    library.toArray().filter(func d =
      d.name.toLower().contains(#text term) or
      d.crop.toLower().contains(#text term) or
      d.symptoms.any(func s = s.toLower().contains(#text term))
    )
  };
};
