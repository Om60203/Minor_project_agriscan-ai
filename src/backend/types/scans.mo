import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type ScanInput = {
    image : Storage.ExternalBlob;
    video : ?Storage.ExternalBlob;
  };
};
