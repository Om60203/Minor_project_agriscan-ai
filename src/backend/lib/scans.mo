import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Char "mo:core/Char";
import Runtime "mo:core/Runtime";
import { fromEnv } "mo:caffeineai-inference-client/Config";
import ChatApi "mo:caffeineai-inference-client/Apis/ChatApi";
import ChatCompletionRequest "mo:caffeineai-inference-client/Models/ChatCompletionRequest";
import ChatCompletionRequestMessageOneOf2 "mo:caffeineai-inference-client/Models/ChatCompletionRequestMessageOneOf2";
import Types "../types/common";
import ScanTypes "../types/scans";

module {
  // Extract the trimmed value that follows "LABEL:" on the first matching line.
  func fieldValue(text : Text, fieldLabel : Text) : Text {
    let prefix = fieldLabel # ":";
    var value = "";
    for (line in text.split(#char '\n')) {
      let trimmed = line.trim(#predicate (func c = c == ' ' or c == '\t' or c == '\r'));
      if (trimmed.startsWith(#text prefix)) {
        value := (trimmed.stripStart(#text prefix) ?? "").trim(#char ' ');
      };
    };
    value
  };

  // Extract a pipe-delimited list field ("a | b | c") into an array of trimmed items.
  func listValue(text : Text, fieldLabel : Text) : [Text] {
    let raw = fieldValue(text, fieldLabel);
    if (raw == "") { return [] };
    raw.split(#char '|')
      .map(func item = item.trim(#char ' '))
      .filter(func item = item != "")
      .toArray()
  };

  // Parse the leading digits of a text into a Nat (used for the confidence percentage).
  func parseNat(text : Text) : Nat {
    var result = 0;
    for (c in text.toIter()) {
      let code = c.toNat32();
      if (code >= 48 and code <= 57) {
        result := result * 10 + (code - 48).toNat();
      };
    };
    result
  };

  // Ask the platform inference model for a structured plant-disease diagnosis and
  // parse the labeled response into a ScanRecord. The image/video references are
  // carried through untouched; the model returns the textual diagnosis fields.
  func analyzeImage<system>(input : ScanTypes.ScanInput) : async* Types.ScanRecord {
    let config = fromEnv<system>();
    let prompt =
      "You are an expert plant pathologist. A farmer uploaded a photo of a crop leaf "
      # "for disease detection. Produce a structured diagnosis. Respond with EXACTLY "
      # "the following labeled format, one field per line, using the pipe symbol '|' "
      # "to separate list items. Do not add any other text.\n"
      # "DISEASE_NAME: <common disease name>\n"
      # "CONFIDENCE: <integer 0-100>\n"
      # "SEVERITY: <low|medium|high>\n"
      # "DESCRIPTION: <short description>\n"
      # "SYMPTOMS: <item1> | <item2> | <item3>\n"
      # "TREATMENT: <item1> | <item2>\n"
      # "PREVENTION: <item1> | <item2>\n"
      # "ORGANIC: <organic suggestion 1> | <organic suggestion 2>\n"
      # "EXPERT: <when to contact an expert>";
    let userMessage = ChatCompletionRequestMessageOneOf2.JSON.init({
      content = #string(prompt);
      role = #user;
    });
    let req = ChatCompletionRequest.JSON.init({
      messages = [#user(userMessage)];
      model = "router";
    });
    let resp = await* ChatApi.createChatCompletion(config, req);
    if (resp.choices.size() == 0) {
      Runtime.trap("Inference returned no choices");
    };
    let content = resp.choices[0].message.content
      ?? Runtime.trap("Inference returned no text content");
    let diseaseName = fieldValue(content, "DISEASE_NAME");
    if (diseaseName == "") {
      Runtime.trap("The AI could not identify a disease from this image. Please try a clearer, well-lit photo of the affected leaf.");
    };
    {
      id = 0;
      imageUrl = input.image;
      videoUrl = input.video;
      diseaseName;
      confidence = parseNat(fieldValue(content, "CONFIDENCE")).toFloat();
      severity = fieldValue(content, "SEVERITY");
      description = fieldValue(content, "DESCRIPTION");
      symptoms = listValue(content, "SYMPTOMS");
      treatment = listValue(content, "TREATMENT");
      prevention = listValue(content, "PREVENTION");
      organicSuggestions = listValue(content, "ORGANIC");
      expertAdvice = fieldValue(content, "EXPERT");
      timestamp = 0;
    };
  };

  public func createScan<system>(scans : Map.Map<Nat, Types.ScanRecord>, scanCounter : { var next : Nat }, input : ScanTypes.ScanInput) : async Types.ScanRecord {
    let diagnosis = await* analyzeImage<system>(input);
    let id = scanCounter.next;
    scanCounter.next += 1;
    let record : Types.ScanRecord = {
      id;
      imageUrl = input.image;
      videoUrl = input.video;
      diseaseName = diagnosis.diseaseName;
      confidence = diagnosis.confidence;
      severity = diagnosis.severity;
      description = diagnosis.description;
      symptoms = diagnosis.symptoms;
      treatment = diagnosis.treatment;
      prevention = diagnosis.prevention;
      organicSuggestions = diagnosis.organicSuggestions;
      expertAdvice = diagnosis.expertAdvice;
      timestamp = Time.now();
    };
    scans.add(id, record);
    record
  };

  public func getScan(scans : Map.Map<Nat, Types.ScanRecord>, id : Nat) : ?Types.ScanRecord {
    scans.get(id)
  };

  public func listScans(scans : Map.Map<Nat, Types.ScanRecord>) : [Types.ScanRecord] {
    let all = scans.values().toArray();
    all.sort(func (a, b) =
      if (a.timestamp > b.timestamp) { #less }
      else if (a.timestamp < b.timestamp) { #greater }
      else { #equal }
    )
  };
};
