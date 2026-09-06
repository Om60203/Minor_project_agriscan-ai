import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/common";
import ChatLib "../lib/chat";

mixin (
  accessControlState : AccessControl.AccessControlState,
  chat : List.List<Types.ChatMessage>,
  chatSession : { var id : Nat },
) {
  public shared ({ caller }) func sendChatMessage(message : Text) : async Types.ChatMessage {
    ignore caller;
    await ChatLib.sendChatMessage(chat, chatSession, message)
  };

  public query ({ caller }) func getChatHistory() : async [Types.ChatMessage] {
    ignore caller;
    ChatLib.getChatHistory(chat)
  };
};
