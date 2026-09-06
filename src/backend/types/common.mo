import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type ScanRecord = {
    id : Nat;
    imageUrl : Storage.ExternalBlob;
    videoUrl : ?Storage.ExternalBlob;
    diseaseName : Text;
    confidence : Float;
    severity : Text;
    description : Text;
    symptoms : [Text];
    treatment : [Text];
    prevention : [Text];
    organicSuggestions : [Text];
    expertAdvice : Text;
    timestamp : Int;
  };

  public type DiseaseEntry = {
    crop : Text;
    name : Text;
    imageUrl : Storage.ExternalBlob;
    symptoms : [Text];
    causes : [Text];
    treatment : [Text];
    prevention : [Text];
  };

  public type ChatRole = {
    #user;
    #assistant;
  };

  public type ChatMessage = {
    role : ChatRole;
    content : Text;
    timestamp : Int;
  };

  public type ChatSession = {
    id : Nat;
    messages : [ChatMessage];
    createdAt : Int;
  };
};
