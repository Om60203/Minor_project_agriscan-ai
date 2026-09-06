import Map "mo:core/Map";
import Nat "mo:core/Nat";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Expose "mo:caffeineai-oql/Expose";
import Entity "mo:caffeineai-oql/Entity";
import MapEntity "mo:caffeineai-oql/MapEntity";
import ListEntity "mo:caffeineai-oql/ListEntity";
import NatValue "mo:caffeineai-oql/NatValue";
import FloatValue "mo:caffeineai-oql/FloatValue";
import IntValue "mo:caffeineai-oql/IntValue";
import TextValue "mo:caffeineai-oql/TextValue";
import Types "types/common";
import ScansApi "mixins/scans-api";
import LibraryApi "mixins/library-api";
import ChatApi "mixins/chat-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);
  include MixinObjectStorage();

  let scans : Map.Map<Nat, Types.ScanRecord>;
  let library : List.List<Types.DiseaseEntry>;
  let chat : List.List<Types.ChatMessage>;
  let scanCounter : { var next : Nat };
  let chatSession : { var id : Nat };

  include ScansApi(accessControlState, scans, scanCounter);
  include LibraryApi(accessControlState, library);
  include ChatApi(accessControlState, chat, chatSession);
  include ApiDocMixin();

  include Expose({
    entities = [
      scans.toEntityManual("scan", "ScanRecord", "id")
        .sample({ id = 0; imageUrl = [].toBlob(); videoUrl = null; diseaseName = ""; confidence = 0.0; severity = ""; description = ""; symptoms = []; treatment = []; prevention = []; organicSuggestions = []; expertAdvice = ""; timestamp = 0 })
        .payload("id", func s = s.id)
        .payload("diseaseName", func s = s.diseaseName)
        .payload("confidence", func s = s.confidence)
        .payload("severity", func s = s.severity)
        .payload("timestamp", func s = s.timestamp)
        .controllerOnly()
        .build(),
      library.toEntityManual("disease", "DiseaseEntry", "name")
        .sample({ crop = ""; name = ""; imageUrl = [].toBlob(); symptoms = []; causes = []; treatment = []; prevention = [] })
        .payload("crop", func d = d.crop)
        .payload("name", func d = d.name)
        .public_()
        .build(),
      chat.toEntityManual("chatMessage", "ChatMessage", "timestamp")
        .sample({ role = #user; content = ""; timestamp = 0 })
        .payload("role", func m = (switch (m.role) { case (#user) "user"; case (#assistant) "assistant" }))
        .payload("content", func m = m.content)
        .payload("timestamp", func m = m.timestamp)
        .controllerOnly()
        .build(),
    ];
  });
};
