import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import { fromEnv } "mo:caffeineai-inference-client/Config";
import ChatApi "mo:caffeineai-inference-client/Apis/ChatApi";
import ChatCompletionRequest "mo:caffeineai-inference-client/Models/ChatCompletionRequest";
import ChatCompletionRequestMessageOneOf "mo:caffeineai-inference-client/Models/ChatCompletionRequestMessageOneOf";
import ChatCompletionRequestMessageOneOf2 "mo:caffeineai-inference-client/Models/ChatCompletionRequestMessageOneOf2";
import Types "../types/common";

module {
  func runChat<system>(prompt : Text) : async* Text {
    let config = fromEnv<system>();
    let systemMessage = ChatCompletionRequestMessageOneOf.JSON.init({
      content = #string("You are AgriScan AI, a friendly plant and crop care assistant. Answer questions about plants, crops, diseases, pests, and farming in simple, clear language. When the user writes in Hindi or Hinglish, respond in Hinglish (Hindi written in Latin script mixed with English) so it is easy to understand. Keep answers practical and helpful.");
      role = #system_;
    });
    let userMessage = ChatCompletionRequestMessageOneOf2.JSON.init({
      content = #string(prompt);
      role = #user;
    });
    let req = ChatCompletionRequest.JSON.init({
      messages = [#system_(systemMessage), #user(userMessage)];
      model = "router";
    });
    let resp = await* ChatApi.createChatCompletion(config, req);
    if (resp.choices.size() == 0) {
      Runtime.trap("Inference returned no choices");
    };
    resp.choices[0].message.content
      ?? Runtime.trap("Inference returned no text content");
  };

  public func sendChatMessage(chat : List.List<Types.ChatMessage>, chatSession : { var id : Nat }, message : Text) : async Types.ChatMessage {
    let userMsg : Types.ChatMessage = {
      role = #user;
      content = message;
      timestamp = Time.now();
    };
    chat.add(userMsg);
    let answer = await* runChat<system>(message);
    let assistantMsg : Types.ChatMessage = {
      role = #assistant;
      content = answer;
      timestamp = Time.now();
    };
    chat.add(assistantMsg);
    chatSession.id += 1;
    assistantMsg
  };

  public func getChatHistory(chat : List.List<Types.ChatMessage>) : [Types.ChatMessage] {
    chat.toArray()
  };
};
